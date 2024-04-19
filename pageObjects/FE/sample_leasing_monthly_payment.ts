import { expect, type Locator, type Page } from '@playwright/test';
import MaximumLeasingMonthlyPaymentCalculator from './maximumLeasingMonthlyPaymentCalculator';

/**
 * Liisingu näidiskuumakse kalkulaator
 */
export default class SampleLeasingMonthlyPaymentCalculator {
    readonly page: Page;
    readonly priceInput: Locator;
    readonly acceptCookieButton: Locator;
    readonly messageCenterButton: Locator;
    readonly initialPaymentPercentageInput: Locator;
    readonly initialPaymentAmountInput: Locator;
    readonly monthlyPaymentAmountDiv: Locator;
    readonly leasingPeriodYearsSelect: Locator;
    readonly leasingPeriodMonthsSelect: Locator;
    readonly interestRateInput: Locator;
    readonly reminderPercentageInput: Locator;
    readonly reminderAmountInput: Locator;
    readonly legalEntityAccountType: Locator;
    readonly vatIncludedCheckbox: Locator;
    readonly vatSchedulingSelect: Locator;
    readonly capitalLoanCheckbox: Locator;
    readonly maxMonthlyPaymentButton: Locator;
    readonly maximumLeasingMonthlyPaymentCalculator: MaximumLeasingMonthlyPaymentCalculator;
    readonly paymentScheduleLinkA: Locator;

    constructor(page: Page) {
        this.page = page;
        this.priceInput = page.locator('#price');
        this.acceptCookieButton = page.locator('#acceptPirukas');
        this.messageCenterButton = page.frameLocator('#launcher').locator('button[aria-label="Ava sõnumiaken"]');
        this.initialPaymentPercentageInput = page.locator('#initial_percentage');
        this.initialPaymentAmountInput = page.locator('#initial');
        this.monthlyPaymentAmountDiv = page.locator('#monthly-payment div.payment');
        this.leasingPeriodYearsSelect = page.locator('select[name="years"]');
        this.leasingPeriodMonthsSelect = page.locator('select[name="months"]');
        this.interestRateInput = page.locator('#interest_rate');
        this.reminderPercentageInput = page.locator('#reminder_percentage');
        this.reminderAmountInput = page.locator('#reminder');
        this.legalEntityAccountType = page.locator('#account_type-1');
        this.vatIncludedCheckbox = page.locator('#vat_included');
        this.vatSchedulingSelect = page.locator('#vat_scheduling');
        this.capitalLoanCheckbox = page.locator('#kas_rent');
        this.maxMonthlyPaymentButton = page.locator('a[href="#max-payment"]');
        this.maximumLeasingMonthlyPaymentCalculator = new MaximumLeasingMonthlyPaymentCalculator(page)
        this.paymentScheduleLinkA = page.locator('a[href*="/et/liising/graafik"]');
    }

    /**
     * Sisesta sõiduki hind
     * @param price sõiduki hind
     */
    async setVehiclePrice(price: number) {
        console.log(`Sisesta sõiduki hind: ${price}.`);
        await this.priceInput.clear();
        await this.priceInput.pressSequentially(price.toString());

    }

    /**
     * Sisesta sissemakse suurus
     * @param initialPaymentAmount 
     */
    async setInitialPaymentAmount(initialPaymentAmount: number) {
        console.log(`Sisesta sissemakse suurus: ${initialPaymentAmount}.`);
        await this.initialPaymentAmountInput.clear();
        await this.initialPaymentAmountInput.pressSequentially(initialPaymentAmount.toString());
    }

    /**
     * Sisesta sissemakse protsent
     * @param initialPaymentPercentage sissemakse protsent
     */
    async setInitialPaymentPercentage(initialPaymentPercentage: number) {
        console.log(`Sisesta sissemakse protsent: ${initialPaymentPercentage}.`);
        await this.initialPaymentPercentageInput.clear();
        await this.initialPaymentPercentageInput.pressSequentially(initialPaymentPercentage.toString());
    }

    /**
     * Vajuta küpsiste "Nõustun" nuppu.
     */
    async clickAcceptCookieButton() {
        console.log('Vajuta küpsiste "Nõustun" nuppu.');
        await this.acceptCookieButton.click();
        await expect(this.messageCenterButton).toHaveCount(1);
    }

    /**
     * Ava liisingu kalkulaator ja nõustu küpsistega.
     */
    async openLeasingPageAndAcceptCookies() {
        console.log('Ava liisingu kalkulaator ja nõustu küpsistega.');
        await this.page.goto('/liising#kalkulaator');
        await expect(this.acceptCookieButton).toBeVisible();
        await this.clickAcceptCookieButton();
    }

    /**
     * Sisesta liisingu perioodi aastate arv
     * @param leasingPeriodYears liisingu perioodi aastate arv
     */
    async setLeasingPeriodYears(leasingPeriodYears: number) {
        console.log(`Sisesta liisingu perioodi aastate arv: ${leasingPeriodYears}.`);
        await this.leasingPeriodYearsSelect.selectOption(leasingPeriodYears.toString());
    }

    /**
     * Sisesta liisingu perioodi kuude arv
     * @param leasingPeriodMonths liisingu perioodi kuude arv
     */
    async setLEasingPeriodMonths(leasingPeriodMonths: number) {
        console.log(`Sisesta liisingu perioodi kuude arv: ${leasingPeriodMonths}.`);
        await this.leasingPeriodMonthsSelect.selectOption(leasingPeriodMonths.toString());
    }

    /**
     * Sisesta intress
     * @param interestRate intressimäär
     */
    async setInterestRate(interestRate: number) {
        console.log(`Sisesta intress: ${interestRate}`);
        await this.interestRateInput.clear();
        await this.interestRateInput.pressSequentially(interestRate.toString());
    }

    /**
     * Sisesta jääkväärtuse protsent
     * @param reminderPercentage Jääkväärtuse protsent
     */
    async setReminderPerentage(reminderPercentage: number) {
        console.log(`Sisesta jääkväärtuse protsent: ${reminderPercentage}.`);
        await this.reminderPercentageInput.clear();
        await this.reminderPercentageInput.pressSequentially(reminderPercentage.toString());
    }

    /**
     * Sisesta jääkväärtuse summa
     * @param reminderAmount jääkväärtuse summa
     */
    async setReminderAmount(reminderAmount: number) {
        console.log(`Sisesta jääkväärtuse summa: ${reminderAmount}.`);
        await this.reminderAmountInput.clear();
        await this.reminderAmountInput.pressSequentially(reminderAmount.toString());
    }

    /**
     * Märgista liisingu tüübiks: juriidiline isik.
     */
    async checkLegalEntityAccountType() {
        console.log(`Märgista liisingu tüübiks: juriidiline isik.`);
        await this.legalEntityAccountType.check();
        await expect(this.vatIncludedCheckbox).toBeVisible();
    }

    /**
     * Linnuta "Hind sisaldab käibemaksu" märkeruut.
     */
    async checkVatIncludedCheckbox() {
        console.log('Linnuta "Hind sisaldab käibemaksu" märkeruut.');
        await this.vatIncludedCheckbox.check();
        await expect(this.vatSchedulingSelect).toBeVisible();
    }

    /**
     * Eemalda linnutus "Hind sisaldab käibemaksu" märkeruudult.
     */
    async uncheckVatIncludedCheckbox() {
        console.log('Eemalda linnutus "Hind sisaldab käibemaksu" märkeruudult.');
        await this.vatIncludedCheckbox.uncheck();
        await expect(this.vatSchedulingSelect).toBeHidden();
    }

    /**
     * Vali käibemaksu tasumise aeg
     * @param vatPaymentTime käibemaksu maksmise tüüp
     */
    async setVatPaymentSchedule(vatPaymentTime: string) {
        console.log(`Vali käibemaksu tasumise aeg: ${vatPaymentTime}`);
        await this.vatSchedulingSelect.selectOption(vatPaymentTime);
    }

    /**
     * Märgista liisingu tüüp: "kasutusrent".
     */
    async checkCapitalLoanCheckbox() {
        console.log(`Märgista liisingu tüüp: "kasutusrent".`);
        await this.capitalLoanCheckbox.check();
        await expect(this.vatIncludedCheckbox).toBeVisible();
    }

    /**
     * Vajuta "Maksimaalne kuumakse" nuppu.
     */
    async clickMaxMonthlyPaymentButton() {
        console.log(`Vajuta "Maksimaalne kuumakse" nuppu.`);
        await this.maxMonthlyPaymentButton.click();
        await expect(this.maximumLeasingMonthlyPaymentCalculator.netIncomeInput).toBeVisible();
    }

    /**
     * Vajuta "Maksegraafik" nuppu.
     */
    async clickPaymentScheduleButton() {
        console.log(`Vajuta "Maksegraafik" nuppu.`);
        await this.paymentScheduleLinkA.click();
    }
}