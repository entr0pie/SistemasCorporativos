/**
 * Service to register and login users.
 *
 * @author Thundera
 */
class UserService {

    /**
     * Creates a new user service.
     *
     * @param userModel
     * @param {BcryptService} bcryptService
     * @param {JwtService} tokenProvider
     */
    constructor(userModel, bcryptService, tokenProvider) {
        this.userModel = userModel;
        this.bcryptService = bcryptService;
        this.tokenProvider = tokenProvider;
    }

    /**
     * Authenticate the user.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<string>} user token.
     *
     * @throws {Error} in bad credentials.
     */
    async login(email, password) {
        const foundUser = await this.userModel.findOne({
            where: {
                email: email,
            }
        });

        if (!foundUser) {
            throw new Error("User not found.");
        }

        const isPasswordEqual = await this.bcryptService.validate(password, foundUser.password);

        if (!isPasswordEqual) {
            throw new Error("Invalid password.");
        }

        return this.tokenProvider.create(email);

    }

    /**
     * Registers a new user.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>} user model
     */
    async register(email, password){
        const foundUser = await this.userModel.findOne({
            where: {
                email: email,
            }
        });

        if (foundUser) {
            throw new Error("User already registered.");
        }

        const hashedPassword = await this.bcryptService.hash(password);
        return await this.userModel.create({
            email: email,
            password: hashedPassword,
        });
    }
}

module.exports = UserService;