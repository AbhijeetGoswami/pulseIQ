import "./AttentionLeaderboard.css";
import Panel from "../../common/Panel/Panel";
import { useNavigate } from "react-router-dom";

export default function AttentionLeaderboard({ entities = [] }) {

    const navigate = useNavigate();

    const leaderboard = [...entities]
        .sort((a, b) => b.attention_score - a.attention_score)
        .slice(0, 10);

    const handleEntityClick = (entity) => {

        navigate(
            `/entities?id=${entity.id}`,
            {
                state: {
                    entity
                }
            }
        );

    };

    return (

        <Panel title="🔥 Top Attention">

            <div className="leaderboard-body">

                {
                    leaderboard.map((entity, index) => (

                        <div
                            key={entity.id}
                            className="leaderboard-row clickable"
                            onClick={() => handleEntityClick(entity)}
                        >

                            <div className="leaderboard-rank">

                                {index + 1}

                            </div>

                            <div className="leaderboard-name">

                                <div className="entity-link">

                                    {entity.value}

                                </div>

                                <div className="entity-meta">

                                    {entity.type} • {entity.sport}

                                </div>

                            </div>

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