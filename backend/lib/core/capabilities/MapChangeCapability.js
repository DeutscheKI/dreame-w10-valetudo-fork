const Capability = require("./Capability");
const NotImplementedError = require("../NotImplementedError");

/**
 * @template {import("../ValetudoRobot")} T
 * @extends Capability<T>
 */
class MapChangeCapability extends Capability {

    /**
     * The most basic functionalities
     *
     * @param {object} options
     * @param {T} options.robot
     */
    constructor(options) {
        super(options);
    }

    /**
     * Changes Map
     *
     * @param {number} map_id
     * @abstract
     * @returns {Promise<void>}
     */
    async changeMap(map_id) {
        throw new NotImplementedError();
    }

    getType() {
        return MapChangeCapability.TYPE;
    }
}

MapChangeCapability.TYPE = "MapChangeCapability";

module.exports = MapChangeCapability;
