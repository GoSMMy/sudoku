export const stopwatch = (onUpdate) => {
    const start = Date.now();
    const intervalId = setInterval(() => {
        const time = new Date(Date.now() - start);
        const diff = (Date.now() - start) / 1000;
        const minutes = Math.floor((diff / 60));
        const seconds = time.getSeconds();

        const result = [minutes, seconds]
            .map((item) => item < 10 ? `0${item}` : item)
            .join(':');
        onUpdate(result);
    }, 500)

    return () => {
        clearInterval(intervalId);
    }
}