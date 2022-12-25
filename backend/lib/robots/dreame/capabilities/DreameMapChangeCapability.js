const MapChangeCapability = require("../../../core/capabilities/MapChangeCapability");
const DreameMiotHelper = require("../DreameMiotHelper");

/**
 * @extends MapChangeCapability<import("../DreameValetudoRobot")>
 */
class DreameMapChangeCapability extends MapChangeCapability {
    /**
     * The most basic functionalities
     *
     * @param {object} options
     * @param {import("../DreameValetudoRobot")} options.robot
     */
    constructor(options) {
        super(options);

        this.helper = new DreameMiotHelper({robot: this.robot});
    }

    async changeMap(map_id) {
        await this.robot.sendCommand("action",
            {
                did: this.robot.deviceId,
                siid: 6,
                aiid: 2,
                in: [
                    {
                        piid: 4,
                        value: JSON.stringify({sm: {}, mapid: map_id})
                    }
                ]
            },
            {timeout: 5000}
        );
        this.robot.pollMap();
    }
}

module.exports = DreameMapChangeCapability;
