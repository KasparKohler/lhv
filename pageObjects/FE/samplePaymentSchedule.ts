import { Locator, Page } from "@playwright/test";

/**
 * Näidismaksegraafiku lehekülg
 */
export default class SamplePaymentSchedule {
    readonly page: Page;
    readonly paymentScheduleHeaderH1: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentScheduleHeaderH1 = page.locator('h1');
    }
}