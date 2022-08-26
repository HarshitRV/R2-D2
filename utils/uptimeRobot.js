import fetch from "node-fetch";

/**
 * @description - Gets the status of a monitor
 * 
 * @param {String} apiKey - Uptime Robot API key
 * @param {Array} monitorName - List of monitor names
 * @returns {Object} - Object with the message and status of the monitor
 */
export const getMonitorStatus = async (apiKey, ...monitorNames) => {
    try {
        const params = new URLSearchParams();
        params.append("api_key", apiKey);
        params.append("format", "json");
        params.append("logs", "1");

        const response = await fetch("https://api.uptimerobot.com/v2/getMonitors", {
            method: "POST",
            body: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
        });

        const data = await response.json();

        const { monitors } = data;
        const statuses = monitors.filter(
            (monitor) => monitorNames.includes(monitor.friendly_name)
        );

        const [ monitor_1, monitor_2 ] = statuses;
        const { status: statusMonitor_1 } = monitor_1;
        const { status: statusMonitor_2 } = monitor_2;

        if(statusMonitor_1 === 2 || statusMonitor_2 === 2) {
          return {
            message: `Montor(s) up`,
            status: 2
          }
        } else {
          return {
            message: `Monitor(s) down`,
            status: 9
          }
        }

    } catch (e) {
        console.error(e);
    }
}