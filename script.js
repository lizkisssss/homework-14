function delayedPromise(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Проміс для значення "${value}" виконано після ${delay} мс.`);
      resolve(value);
    }, delay);
  });
}

const promisesAll = [
  delayedPromise("Перший", 3000),
  delayedPromise(123, 1000),     
  delayedPromise("Третій", 500),
  delayedPromise({ id: 4 }, 2000),
  delayedPromise(true, 4000)     
];

console.log("Завдання 1: Запуск Promise.all...");

Promise.all(promisesAll)
  .then((results) => {
    console.log("--- Результат Promise.all ---");
    console.log("Усі проміси успішно вирішено.");
    console.log("Отримані результати (порядок збережено):", results);
    console.log("------------------------------");
  })
  .catch((error) => {
    console.error("Promise.all відхилено:", error);
  });

function randomDelay(value) {
  const delay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Проміс "${value}" виконано після ${delay} мс.`);
      resolve({ value, delay });
    }, delay);
  });
}

const promisesRace = [
  randomDelay("Учасник A"),
  randomDelay("Учасник B"),
  randomDelay("Учасник C"),
  randomDelay("Учасник D"),
  randomDelay("Учасник E")
];

console.log("\nЗавдання 2: Запуск Promise.race...");

Promise.race(promisesRace)
  .then((result) => {
    console.log("--- Результат Promise.race ---");
    console.log("**Найшвидший проміс (Переможець):**", result.value);
    console.log(`Вирішено за ${result.delay} мс.`);
    console.log("------------------------------");
  })
  .catch((error) => {
    console.error("Promise.race відхилено (Найшвидший проміс був відхилений):", error);
  });