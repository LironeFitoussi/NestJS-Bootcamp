import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
    @Get("/test")
    getRootRoute() {
        return "hi there!";
    }

    @Get("/bye")
    getByeThere() {
        return "bye there!";
    }
}