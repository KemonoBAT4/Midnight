
// base renderer, put this in another file
// maybe use DOM content loaded
class BaseRender {

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

// create a similar for every item for the electron appliaction
class Chart extends BaseRender {

    data = {};

    /**
     * creates the chart for the electron page
     * @param data: JSON -> the json containig the data for the chart
     */
    constructor(data) {

        this.data = data;

        this.style = `
        .charts-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .chart-container {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 2px 15px rgba(0,0,0,0.05);
        }

        .chart-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .chart-wrapper {
            height: 300px;
            position: relative;
        }
        `;

        this.html = `
        <div class="chart-container">
            <h2 class="chart-title"></h2>
            <div class="chart-wrapper">
                <canvas id="chartObject"></canvas>
            </div>
        </div>
        `;

        this.script = `
        function createChart() {
            const ctx = document.getElementById('chartObject').getContext('2d');
            new Chart(ctx, ${JSON.stringify(this.data)});
        }

        document.addEventListener('DOMContentLoaded', () => {
            createChart();
        });
        `;
    }
}

class Text extends BaseRender {

    constructor(text) {

        this.style = ``;
        this.html = ``;
        this.script = ``;
    }
}
