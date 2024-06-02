const BearerTokenMiddlewareFactory = require('../../../../main/services/security/middleware/BearerTokenMiddlewareFactory');

describe("BearerTokenMiddlewareFactory", () => {

    let tokenProvider;
    let req;
    let res;
    let next;

    beforeEach(() => {
        tokenProvider = { validate: jest.fn() };

        req = {
            headers: {
              authorization: "Bearer validToken",
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        next = jest.fn();
    });

    test("Should call next if token is valid.", async () => {
        tokenProvider.validate.mockResolvedValue({ subject: 'leonardo' });

        const middleware = BearerTokenMiddlewareFactory(tokenProvider);
        await middleware(req, res, next);

        expect(tokenProvider.validate).toHaveBeenCalledWith('validToken');
        expect(req.auth).toEqual({ subject: 'leonardo' });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    test("Should reject if header doesn't exists.", async () => {
        tokenProvider.validate.mockResolvedValue({ subject: 'leonardo' });
        req.headers.authorization = null;

        const middleware = BearerTokenMiddlewareFactory(tokenProvider);
        await middleware(req, res, next);

        expect(tokenProvider.validate).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });

    test("Should reject if header is in wrong format.", async () => {
        tokenProvider.validate.mockResolvedValue({ subject: 'leonardo' });
        req.headers.authorization = "Bearer";

        const middleware = BearerTokenMiddlewareFactory(tokenProvider);
        await middleware(req, res, next);

        expect(tokenProvider.validate).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });

    test("Should reject if the token provider fails.", async () => {
        tokenProvider.validate.mockRejectedValue(new Error("Validation failed."));

        req.headers.authorization = 'Bearer invalidToken'

        const middleware = BearerTokenMiddlewareFactory(tokenProvider);
        await middleware(req, res, next);

        expect(tokenProvider.validate).toHaveBeenCalledWith('invalidToken');
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });
});