const PersistentMapControlCapability = require("../../../core/capabilities/PersistentMapControlCapability");

/**
 * @extends PersistentMapControlCapability<import("../MockRobot")>
 */
class MockPersistentMapControlCapability extends PersistentMapControlCapability {
    /**
     * @param {object} options
     * @param {import("../MockRobot")} options.robot
     */
    constructor(options) {
        super(options);

        this.state = true;
    }

    /**
     * @returns {Promise<boolean>}
     */
    async isEnabled() {
        return this.state;
    }

    /**
     * @returns {Promise<void>}
     */
    async enable() {
        this.state = true;
    }

    /**
     * @returns {Promise<void>}
     */
    async disable() {
        this.state = false;
    }
}

module.exports = MockPersistentMapControlCapability;
