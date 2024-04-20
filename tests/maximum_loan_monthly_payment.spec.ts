import { test, expect } from '@playwright/test';
import SampleLeasingMonthlyPaymentCalculator from '../pageObjects/FE/sampleLeasingMonthlyPaymentCalculator';
import MaximumLeasingMonthlyPaymentCalculator from '../pageObjects/FE/maximumLeasingMonthlyPaymentCalculator';

test('Validate that maximum monthly payment is calcualed', async ({ page }) => {
    const sampleLeasingMonthlyPaymentCalculator = new SampleLeasingMonthlyPaymentCalculator(page);
    const maximumMonthlyPaymentCalculator = new MaximumLeasingMonthlyPaymentCalculator(page);

    await sampleLeasingMonthlyPaymentCalculator.openLeasingPageAndAcceptCookies();
    await sampleLeasingMonthlyPaymentCalculator.clickMaxMonthlyPaymentButton();

    const defaultMonthlyPayment = await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent();
    await maximumMonthlyPaymentCalculator.setNetIncome(5000);
    const monthlyPaymentHigherNetIncome = await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent();
    expect(Number(defaultMonthlyPayment)).toBeLessThan(Number(monthlyPaymentHigherNetIncome));

    await maximumMonthlyPaymentCalculator.checkOwnerShipGuarantorRadioButton()
    expect(Number(monthlyPaymentHigherNetIncome)).toEqual(Number(await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent()));

    await maximumMonthlyPaymentCalculator.setGuarantorNetIncome(2000);
    const paymentAMountWithoutDependantPersonChanges =  await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent()
    expect(Number(monthlyPaymentHigherNetIncome)).toBeLessThan(Number(paymentAMountWithoutDependantPersonChanges))

    await maximumMonthlyPaymentCalculator.setDependantPersonsAmount(0);
    const monthlyPaymentWithoutDependantPersons = await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent()
    expect(Number(monthlyPaymentWithoutDependantPersons)).toBeGreaterThan(Number(paymentAMountWithoutDependantPersonChanges))

    await maximumMonthlyPaymentCalculator.setGuarantorDependantPersonsAmount(3);
    const monthlyPaymentWithGuarantorDependantPersons = await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent()
    expect(Number(monthlyPaymentWithGuarantorDependantPersons)).toBeLessThan(Number(monthlyPaymentWithoutDependantPersons))

    await maximumMonthlyPaymentCalculator.checkGuarantorMaritalStatusCheckbox();
    const monthlyPaymentBothParentsMarried = await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent()
    expect(Number(monthlyPaymentBothParentsMarried)).toBeGreaterThan(Number(monthlyPaymentWithGuarantorDependantPersons))

    await maximumMonthlyPaymentCalculator.uncheckMaritalStatusCheckbox();
    const monthlyPaymentGuarantorMarried = await maximumMonthlyPaymentCalculator.maxMonthlyPaymentDiv.textContent()
    expect(Number(monthlyPaymentGuarantorMarried)).toEqual(Number(monthlyPaymentBothParentsMarried))
});

