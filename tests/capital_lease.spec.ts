import { expect, test } from '@playwright/test';
import SampleLeasingMonthlyPaymentCalculator from '../pageObjects/FE/sample_leasing_monthly_payment';
import LeasingPrices from '../testData/leasingPrices';

const leasingPrices = new LeasingPrices()

test('Validate that all fields can be used for individual capital leasing', async ({ page }) => {
  const sampleLeasingMonthlyPaymentCalculator = new SampleLeasingMonthlyPaymentCalculator(page);
  await sampleLeasingMonthlyPaymentCalculator.openLeasingPageAndAcceptCookies()

  await sampleLeasingMonthlyPaymentCalculator.setVehiclePrice(leasingPrices.individualLeasingExample.totalPrice)
  const defaultInitialPaymentPercentage = await sampleLeasingMonthlyPaymentCalculator.initialPaymentPercentageInput.inputValue()
  await
    expect(sampleLeasingMonthlyPaymentCalculator.initialPaymentAmountInput)
      .toHaveValue((Number(defaultInitialPaymentPercentage) / 100 * leasingPrices.individualLeasingExample.totalPrice).toString())
  
  const defaultReminderPercentage = await sampleLeasingMonthlyPaymentCalculator.reminderPercentageInput.inputValue()
  await
    expect(sampleLeasingMonthlyPaymentCalculator.reminderAmountInput)
      .toHaveValue((Number(defaultReminderPercentage) / 100 * leasingPrices.individualLeasingExample.totalPrice).toString())

  await sampleLeasingMonthlyPaymentCalculator.setInitialPaymentAmount(leasingPrices.individualLeasingExample.InitialPaymentAmount)
  await
    expect(sampleLeasingMonthlyPaymentCalculator.initialPaymentPercentageInput)
      .toHaveValue((leasingPrices.individualLeasingExample.InitialPaymentAmount / leasingPrices.individualLeasingExample.totalPrice * 100).toString())

  await sampleLeasingMonthlyPaymentCalculator.setInitialPaymentPercentage(leasingPrices.individualLeasingExample.InitialPaymentPercentage)
  await
    expect(sampleLeasingMonthlyPaymentCalculator.initialPaymentAmountInput)
      .toHaveValue((leasingPrices.individualLeasingExample.InitialPaymentPercentage * leasingPrices.individualLeasingExample.totalPrice / 100).toString())
  const monthlyPaymentAmount = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()

  await sampleLeasingMonthlyPaymentCalculator.setLeasingPeriodYears(3)
  const monthlyPaymentAmountWithSmallerPeriod = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentAmountWithSmallerPeriod)).toBeGreaterThan(Number(monthlyPaymentAmount))

  await sampleLeasingMonthlyPaymentCalculator.setLEasingPeriodMonths(12)
  const monthlyPaymentAmountWithChangedMonths = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentAmountWithSmallerPeriod)).toBeGreaterThan(Number(monthlyPaymentAmountWithChangedMonths))

  await sampleLeasingMonthlyPaymentCalculator.setInterestRate(5)
  const monthlyPaymentLowerInterestRate = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentAmountWithChangedMonths)).toBeGreaterThan(Number(monthlyPaymentLowerInterestRate))

  await sampleLeasingMonthlyPaymentCalculator.setReminderPerentage(50)
  const monthlyPaymentReminderPercentageHigher = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentLowerInterestRate)).toBeGreaterThan(Number(monthlyPaymentReminderPercentageHigher))
  await expect(sampleLeasingMonthlyPaymentCalculator.reminderAmountInput).toHaveValue((leasingPrices.individualLeasingExample.totalPrice * 0.5).toString())

  await sampleLeasingMonthlyPaymentCalculator.setReminderAmount(20000)
  const monthlyPaymentReminderAmountChanged = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentReminderPercentageHigher)).toBeGreaterThan(Number(monthlyPaymentReminderAmountChanged))
  await expect(sampleLeasingMonthlyPaymentCalculator.reminderPercentageInput).toHaveValue((20000 / leasingPrices.individualLeasingExample.totalPrice * 100).toString())
});

test('Validate that fields specific for legal entity capital leasing can be used', async ({ page }) => {
  const sampleLeasingMonthlyPaymentCalculator = new SampleLeasingMonthlyPaymentCalculator(page);
  await sampleLeasingMonthlyPaymentCalculator.openLeasingPageAndAcceptCookies()
  await sampleLeasingMonthlyPaymentCalculator.checkLegalEntityAccountType()

  const monthlyPaymentAmount = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  await sampleLeasingMonthlyPaymentCalculator.uncheckVatIncludedCheckbox()
  const monthlyPaymentWithoutPriceIncludingVat = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentWithoutPriceIncludingVat)).toBeGreaterThan(Number(monthlyPaymentAmount))

  await sampleLeasingMonthlyPaymentCalculator.checkVatIncludedCheckbox()
  await sampleLeasingMonthlyPaymentCalculator.setVatPaymentSchedule("EQUAL3M")
  const monthlyPaymentVatPaymentIn3Months = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentVatPaymentIn3Months)).toBeGreaterThan(0)
  expect(Number(monthlyPaymentVatPaymentIn3Months)).not.toBeNull()
  expect(Number(monthlyPaymentVatPaymentIn3Months)).not.toEqual(Number(monthlyPaymentWithoutPriceIncludingVat))

  await sampleLeasingMonthlyPaymentCalculator.setVatPaymentSchedule("DELAY3M")
  const monthlyPaymentVatPaymentIn6Months = await sampleLeasingMonthlyPaymentCalculator.monthlyPaymentAmountDiv.textContent()
  expect(Number(monthlyPaymentVatPaymentIn6Months)).toBeGreaterThan(0)
  expect(Number(monthlyPaymentVatPaymentIn6Months)).not.toBeNull()
  expect(Number(monthlyPaymentVatPaymentIn6Months)).not.toEqual(Number(monthlyPaymentVatPaymentIn3Months))
});