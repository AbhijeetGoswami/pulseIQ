import "./AttentionLeaderboard.css";
import Panel from "../../common/Panel/Panel";

export default function AttentionLeaderboard({ entities = [] }) {

    const leaderboard = [...entities]
        .sort(
            (a, b) =>
                b.attention_score - a.attention_score
        )
        .slice(0, 10);

    return (

        <Panel title="Attention Leaderboard">

            {/* <div className="leaderboard-header">
                Attention Leaderboard
            </div> */}

            <div className="leaderboard-body">

                {
                    leaderboard.map((entity, index) => (

                        <div
                            key={entity.id}
                            className="leaderboard-row"
                        >

                            <div className="leaderboard-rank">
                                {index + 1}
                            </div>

                            <div className="leaderboard-name">

                                <div className="entity-name">
                                    {entity.value}
                                </div>

                                <div className="entity-meta">
                                    {entity.type} • {entity.sport}
                                </div>

                            </div>

                            {/* <div className="leaderboard-score">
                                {entity.attention_score}
                            </div> */}

                            <div className="leaderboard-progress">

                            <div
                                className="leaderboard-progress-fill"
                                style={{
                                    width: `${entity.attention_score}%`
                                }}
                            />

                        </div>

                        <div className="leaderboard-score">

                            {entity.attention_score}

                        </div>

                        </div>

                    ))
                }

            </div>

        </Panel>

    );

}