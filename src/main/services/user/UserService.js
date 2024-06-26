const {Model} = require("sequelize");

/**
 * Service to register and login users.
 *
 * @author Caio Porcel
 */
class UserService {

    /**
     * Creates a new user service.
     *
     * @param {Model} userModel
     * @param {PasswordManager} passwordManager
     * @param {TokenProvider} tokenProvider
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(userModel, passwordManager, tokenProvider, paginatedSearcher) {
        this.userModel = userModel;
        this.passwordManager = passwordManager;
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

        const isPasswordEqual = await this.passwordManager.verify(password, foundUser.password);

        if (!isPasswordEqual) {
            throw new Error("Invalid password.");
        }

        return this.tokenProvider.create(email);

    }

    /**
     * Registers a new user.
     *
     * @param {string} email
     * @param {string} password
     * @param {number} departmentId
     * @returns {Promise<any>} user model
     */
    async register(email, password, departmentId) {
        const foundUser = await this.userModel.findOne({
            where: {
                email: email,
            }
        });

        if (foundUser) {
            throw new Error("User already registered.");
        }

        const hashedPassword = await this.passwordManager.encrypt(password);
        return await this.userModel.create({
            email: email,
            password: hashedPassword,
            departmentId: departmentId
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
                ({id: user.id, email: user.email, createdAt: user.createdAt, updateAt: user.updatedAt})
            );
            return data;
        });
    }

    /**
     * Find user by email.
     *
     * @param {string} email
     * @returns {Promise<Model>} user model.
     */
    async findByEmail(email) {
        return await this.userModel.findOne({
            where: {
                email: email,
            }
        });
    }
}

module.exports = UserService;