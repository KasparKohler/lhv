import { test, expect } from '@playwright/test';
import SampleLeasingMonthlyPaymentCalculator from '../pageObjects/FE/sampleLeasingMonthlyPaymentCalculator';
import LeasingPrices from '../testData/leasingPrices';
import SamplePaymentSchedule from '../pageObjects/FE/samplePaymentSchedule';

const leasingPrices = new LeasingPrices()

test('Validate that capital loan is calculated', async ({ page }) => {
  const sampleLeasingMonthlyPaymentCalculator = new SampleLeasingMonthlyPaymentCalculator(page);
  await sampleLeasingMonthlyPaymentCalculator.openLeasingPageAndAcceptCookies()
  await sampleLeasingMonthlyPaymentCalculator.checkCapitalLoanCheckbox()

  const sampleMonthlyPaymentAmount = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(sampleMonthlyPaymentAmount)).not.toBeNull()
  expect(Number(sampleMonthlyPaymentAmount)).toBeGreaterThan(0)

  await sampleLeasingMonthlyPaymentCalculator.checkLegalEntityAccountType()
  const sampleMonthlyPaymentLegalEntity = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(sampleMonthlyPaymentAmount).toEqual(sampleMonthlyPaymentLegalEntity)
});

test('Validate that payment schedule url changes, when loan numbers change', async ({ page }) => {
  const sampleLeasingMonthlyPaymentCalculator = new SampleLeasingMonthlyPaymentCalculator(page);
  await sampleLeasingMonthlyPaymentCalculator.openLeasingPageAndAcceptCookies()

  const paymentScheduleUrl = await sampleLeasingMonthlyPaymentCalculator.paymentScheduleLinkA.getAttribute('href')

  await sampleLeasingMonthlyPaymentCalculator.setVehiclePrice(leasingPrices.individualLeasingExample.totalPrice)
  const paymentScheduleUrlAfterChange = await sampleLeasingMonthlyPaymentCalculator.paymentScheduleLinkA.getAttribute('href')

  expect(paymentScheduleUrl).not.toEqual(paymentScheduleUrlAfterChange)
})

test('Validate that sample payment schedule url opens', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const sampleLeasingMonthlyPaymentCalculator = new SampleLeasingMonthlyPaymentCalculator(page);
  
  await sampleLeasingMonthlyPaymentCalculator.openLeasingPageAndAcceptCookies()

  const newPagePromise = context.waitForEvent('page');
  await sampleLeasingMonthlyPaymentCalculator.clickPaymentScheduleButton()
  const newPage = await newPagePromise;

  const samplePaymentSchedule = new SamplePaymentSchedule(newPage);
  await expect(samplePaymentSchedule.paymentScheduleHeaderH1).toHaveText("Näidismaksegraafik")
})