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
     * @param {TokenProvider} tokenProvider
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(userModel, bcryptService, tokenProvider, paginatedSearcher) {
        this.userModel = userModel;
        this.bcryptService = bcryptService;
        this.tokenProvider = tokenProvider;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Authenticate the user.
     *
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

        const isPasswordEqual = await this.bcryptService.verify(password, foundUser.password);

        if (!isPasswordEqual) {
            throw new Error("Invalid password-manager.");
        }

        return this.tokenProvider.create(email);

    }

    /**
     * Registers a new user.
     *
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

        const hashedPassword = await this.bcryptService.encrypt(password);
        return await this.userModel.create({
            email: email,
            password: hashedPassword,
        });
    }

    /**
     * Search users using pagination.
     *
     * @param {number} page
     * @param {size} size
     * @return {Promise<PaginatedResource>} paginated resource.
     */
    async findAll(page, size) {
        return this.paginatedSearcher.search(page, size).then((data) => {
            data.items = data.items.map((user) =>
                ({ id: user.id, email: user.email, createdAt: user.createdAt, updateAt: user.updatedAt })
            );
            return data;
        });
    }
}

module.exports = UserService;