const CapabilityRouter = require("./CapabilityRouter");

class MapChangeCapabilityRouter extends CapabilityRouter {
    initRoutes() {
        this.router.put("/", this.validator, async (req, res) => {
            try {
                await this.capability.changeMap(req.body.action);
                res.sendStatus(200);
            } catch (e) {
                this.sendErrorResponse(req, res, e);
            }
        });
    }
}

module.exports = MapChangeCapabilityRouter;
