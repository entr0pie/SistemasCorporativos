const { body } = require("express-validator");
const RequestValidator = require("../../../../main/services/data/request-validator/RequestValidator")

describe("RequestValidator", () => {
    let req, res, next;

    beforeEach(() => {
        jest.resetAllMocks();

        req = {
            body: {
                email: "email@email.com",
                password: "password",
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    it("Should proceed if validation chain pass.", async () => {
        const validators = [
            body('email').notEmpty().isEmail(),
            body('password').notEmpty().isString(),
        ];

        const middleware = RequestValidator(...validators);
        await middleware(req, res, next);

        expect(res.json).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    it("Should deny if one validation of the chain fails.", async () => {
        const validators = [
            body('email').notEmpty().isEmail(),
            body('password').notEmpty().isString(),
        ];

        req.body.email = "not-a-email";

        const middleware = RequestValidator(...validators);
        await middleware(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ errors: [{
                "type": "field",
                "value": "not-a-email",
                "msg": "Invalid value",
                "path": "email",
                "location": "body"
            }]
        });

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("Should deny if more than one validation of the chain fails.", async () => {
        const validators = [
            body('email').notEmpty().isEmail(),
            body('password').notEmpty().isString(),
        ];

        req.body.email = "not-a-email";
        req.body.password = 123;

        const middleware = RequestValidator(...validators);
        await middleware(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ errors: [
                {
                    "type": "field",
                    "value": "not-a-email",
                    "msg": "Invalid value",
                    "path": "email",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": 123,
                    "msg": "Invalid value",
                    "path": "password",
                    "location": "body"
                },
            ]}
        );

        expect(res.status).toHaveBeenCalledWith(400);
    });
});