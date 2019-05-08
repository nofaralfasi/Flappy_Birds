define(['../../../shared/constants'], function (Const) {

    return (
        [
            {
                nightSrc: 'img/night.png',
                width: 500,
                height: 768,
                posY: 0,
                speed: Const.LEVEL_SPEED / 4
            },
            {
                daySrc: 'img/clouds.png',
                nightSrc: 'img/night-clouds.png',
                width: 300,
                height: 256,
                posY: 416,
                speed: Const.LEVEL_SPEED / 3
            },
            {
                daySrc: 'img/city.png',
                nightSrc: 'img/night-city.png',
                width: 300,
                height: 256,
                posY: 416,
                speed: Const.LEVEL_SPEED / 2
            },
            {
                daySrc: 'img/trees.png',
                nightSrc: 'img/night-trees.png',
                width: 300,
                height: 216,
                posY: 456,
                speed: Const.LEVEL_SPEED
            }
        ]);
});