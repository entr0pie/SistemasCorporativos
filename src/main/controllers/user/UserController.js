/**
 * Login and register endpoints.
 *
 * @author Thundera
 */
class UserController {

    /**
     * Creates a new UserController.
     *
     * @param {UserService} userService
     */
    constructor(userService) {
        this.userService = userService;
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const access_token = await this.userService.login(email, password);
            return res.json({ access_token: access_token });
        } catch (e) {
            console.error('Could not login: ', e);
            return res.status(403).send();
        }
    }
    async register(req, res) {
        const { email, password } = req.body;
        try {
            const newUser = await this.userService.register(email, password);
            return res.status(204).send();
        } catch (e) {
            console.error('Could not register: ', e);
            return res.status(403).send();
        }
    }
}

module.exports = UserController;