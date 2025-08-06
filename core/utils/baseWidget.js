
class BaseWidget {

    style = '';
    html = '';
    script = '';

    /**
     * creates the html object for the page
     * @param style: string -> the style string for the html
     * @param html: string -> the html
     * @param script: string -> the script for the html
     */
    constructor() { }

    /**
     * returns the page code
     * @returns the html page to be rendered
     */
    render() {

        return `
            <style>
                ${this.style}
            </style>

            ${this.html}

            <script>
                ${this.script}
            </script>
        `
    }
}