const { Builder, By} = require('selenium-webdriver');

async function test1() {
  let driver = await new Builder().forBrowser('MicrosoftEdge').build();
  try {
    // Открываем страницу
    await driver.get('http://localhost:5174/');

    // Вводим имя брокера
    const brokerInput = await driver.findElement(By.xpath('//*[@id="app"]/div/div/main/div/div/div/div/div[3]/div[2]/div[1]/div/div[3]/div'));
    await brokerInput.click();
    const selectName = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div/div[2]/div[2]'));
    await selectName.click();

    // Нажимаем кнопку "Login"
    const loginButton = await driver.findElement(By.xpath('//*[@id="app"]/div/div/main/div/div/div/div/div[4]/button'));
    await loginButton.click();

    setTimeout(() => {}, 10000)
  } finally {
    // await driver.quit();
  }
}



test1().then( () => console.log('end'))
