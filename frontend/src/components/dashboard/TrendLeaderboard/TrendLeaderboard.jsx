import "./TrendLeaderboard.css";
import Panel from "../../common/Panel/Panel";

const ICONS = {
    new: "🔥",
    rising: "📈",
    falling: "📉",
    disappeared: "❌",
    stable: "➖"
};



export default function TrendLeaderboard({ trends = [] }) {

    return (

        <Panel title="Trending Now">

            {/* <div className="leaderboard-header">
                Trending Now
            </div> */}

            <div className="leaderboard-body">

                {
                    trends.slice(0,10).map((trend) => (

                        <div
                            key={trend.id}
                            className="trend-row"
                        >

                            {/* <span className="trend-icon">
                                {ICONS[trend.trend]}
                            </span> */}

                            <span className={`trend-badge ${trend.trend}`}>

                                {trend.trend.toUpperCase()}

                            </span>

                            <div className="trend-name">
                                {trend.value}
                            </div>

                            <div className="trend-state">
                                {trend.trend}
                            </div>

                        </div>

                    ))
                }

            </div>

        </Panel>

    );

}