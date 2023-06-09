export class Color {
    static HEX_LENGTH = 6;
    static PREFIX_CSS = '#';
    static HEX = [
        '0', '1', '2', '3',
        '4', '5', '6', '7',
        '8', '9', 'A', 'B',
        'C', 'D', 'E', 'F'
    ];
    static OPACITY_IN_HEX = '11';

    /**
     * Returns a random color
     * */
    static getRandom() {
        return Color.generateColor();
    }

    /**
     * Generates random color with HEX format for CSS
     * @param length
     */
    static generateColor() {
        let output = "";
        for (let lengthIndex = 0; lengthIndex < Color.HEX_LENGTH; lengthIndex++) {
            const randomValue = (Math.round(Math.random() * (Color.HEX.length - 1)));
            const hexValue = Color.HEX[randomValue];
            if (hexValue !== undefined)
                output += hexValue;
        }
        return Color.PREFIX_CSS + output + Color.OPACITY_IN_HEX;
    }
}