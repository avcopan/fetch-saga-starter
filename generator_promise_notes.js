function delay(duration) {
  console.log('starting now');
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

delay(5000).then(() => console.log('hi'));