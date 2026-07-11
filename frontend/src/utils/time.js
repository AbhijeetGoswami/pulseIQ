export function formatDateTime(timestamp) {

    if (!timestamp) {
        return "Unknown";
    }

    const date = new Date(timestamp);

    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });

}

export function formatRelativeTime(timestamp, now = Date.now()) {

    if (!timestamp) {
        return "";
    }

    const diff = Math.floor(
        (now - new Date(timestamp).getTime()) / 1000
    );

    if (diff < 60) {
        return `Updated ${diff} sec ago`;
    }

    const minutes = Math.floor(diff / 60);

    if (minutes < 60) {
        return `Updated ${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `Updated ${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);

    return `Updated ${days} day${days === 1 ? "" : "s"} ago`;
}