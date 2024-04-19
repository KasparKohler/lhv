import { Locator, Page, expect } from "@playwright/test";

/**
 * Liisingu maksimaalse kuumakse kalkulaator
 */
export default class MaximumLeasingMonthlyPaymentCalculator {
    readonly page: Page;
    readonly netIncomeInput: Locator;
    readonly maxMonthlyPaymentDiv: Locator;
    readonly ownerShipGuarantorRadioButton: Locator;
    readonly guarantorNetIncomeInput: Locator;
    readonly dependantPersonSelect: Locator;
    readonly guarantorDependantPersonSelect: Locator;
    readonly guarantorMaritalStatusCheckbox: Locator;
    readonly maritalStatusCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.netIncomeInput = page.locator('#monthly-income');
        this.maxMonthlyPaymentDiv = page.locator('#max-payment div.payment');
        this.ownerShipGuarantorRadioButton = page.locator('#ownership-1');
        this.guarantorNetIncomeInput = page.locator('#guarantor-monthly-income');
        this.dependantPersonSelect = page.locator('#dependent-persons');
        this.guarantorDependantPersonSelect = page.locator('#guarantor-dependent-persons');
        this.guarantorMaritalStatusCheckbox = page.locator('#guarantor-marital-status-married');
        this.maritalStatusCheckbox = page.locator('#marital-status-married');
    }

    /**
     * Sisesta põhitaotleja netosissetulek
     * @param netIncome netosissetulek
     */
    async setNetIncome(netIncome: number) {
        console.log(`Sisesta põhitaotleja netosissetulek: ${netIncome}`);
        await this.netIncomeInput.clear();
        await this.netIncomeInput.pressSequentially(netIncome.toString());
    }

    /**
     * Linnuta liisingu taotlus: "koos kaastaotlejaga" nupp.
     */
    async checkOwnerShipGuarantorRadioButton() {
        console.log(`Linnuta liisingu taotlus: "koos kaastaotlejaga" nupp.`);
        await this.ownerShipGuarantorRadioButton.check();
        await expect(this.guarantorNetIncomeInput).toBeVisible();
    }

    /**
     * Sisesta kaastaotleja netosissetulek
     * @param guarantorNetIncome kaastaotleje netosissetulek
     */
    async setGuarantorNetIncome(guarantorNetIncome: number) {
        console.log(`Sisesta kaastaotleja netosissetulek: ${guarantorNetIncome}.`);
        await this.guarantorNetIncomeInput.clear();
        await this.guarantorNetIncomeInput.pressSequentially(guarantorNetIncome.toString());
    }

    /**
     * Sisesta põhitaotleja ülalpeetavate arv
     * @param dependantPersonsAmount ülalpeetavate arv
     */
    async setDependantPersonsAmount(dependantPersonsAmount: number) {
        console.log(`Sisesta põhitaotleja ülalpeetavate arv: ${dependantPersonsAmount}`);
        await this.dependantPersonSelect.selectOption(dependantPersonsAmount.toString());
    }

    /**
     * Sisesta kaastaotlejate ülalpeetavate arv
     * @param guarantorDependantPersonsAmount ülalpeetavate arv
     */
    async setGuarantorDependantPersonsAmount(guarantorDependantPersonsAmount: number) {
        console.log(`Sisesta kaastaotlejate ülalpeetavate arv: ${guarantorDependantPersonsAmount}`);
        await this.guarantorDependantPersonSelect.selectOption(guarantorDependantPersonsAmount.toString());
    }

    /**
     * Linnuta kaastaotleja "abielus või vabaabielus" märkeruut.
     */
    async checkGuarantorMaritalStatusCheckbox() {
        console.log(`Linnuta kaastaotleja "abielus või vabaabielus" märkeruut.`);
        await this.guarantorMaritalStatusCheckbox.check();
    }

    /**
     * Eemalda linnutus märkeruudult põhitaotleja "abielus või vabaabielus".
     */
    async uncheckMaritalStatusCheckbox() {
        console.log(`Eemalda linnutus märkeruudult põhitaotleja "abielus või vabaabielus".`);
        await this.maritalStatusCheckbox.uncheck();
    }
}