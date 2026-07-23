import { useState } from "react";
import {
  useRelationship,
  type Aspiration,
  type Conversation,
  type Goal,
} from "@/entities/relationship";
import { EmptyState, PageHeader, useToast } from "@/shared/ui";
import AspirationCard from "./AspirationCard";
import AspirationForm from "./AspirationForm";
import ConversationCard from "./ConversationCard";
import ConversationForm from "./ConversationForm";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import "./PlansPage.css";

export default function PlansPage() {
  const { state, dispatch } = useRelationship();
  const { notify } = useToast();

  const [goalEditing, setGoalEditing] = useState<Goal | null>(null);
  const [goalOpen, setGoalOpen] = useState(false);
  const [convEditing, setConvEditing] = useState<Conversation | null>(null);
  const [convOpen, setConvOpen] = useState(false);
  const [aspEditing, setAspEditing] = useState<Aspiration | null>(null);
  const [aspOpen, setAspOpen] = useState(false);

  // Remover é reversível: o item sai na hora e o moodlet segura o caminho de volta.
  const removeGoal = (goal: Goal) => {
    const at = state.goals.findIndex((x) => x.id === goal.id);
    dispatch({ type: "removeGoal", id: goal.id });
    notify({
      emoji: "🎈",
      message: `"${goal.title}" saiu das metas.`,
      action: {
        label: "Desfazer",
        onClick: () => dispatch({ type: "upsertGoal", goal, at }),
      },
    });
  };

  const removeConversation = (conversation: Conversation) => {
    const at = state.conversations.findIndex((x) => x.id === conversation.id);
    dispatch({ type: "removeConversation", id: conversation.id });
    notify({
      emoji: "💌",
      message: `"${conversation.title}" saiu das cartas.`,
      action: {
        label: "Desfazer",
        onClick: () => dispatch({ type: "upsertConversation", conversation, at }),
      },
    });
  };

  const removeAspiration = (aspiration: Aspiration) => {
    const at = state.aspirations.findIndex((x) => x.id === aspiration.id);
    dispatch({ type: "removeAspiration", id: aspiration.id });
    notify({
      emoji: "🌟",
      message: `"${aspiration.title}" saiu das aspirações.`,
      action: {
        label: "Desfazer",
        onClick: () => dispatch({ type: "upsertAspiration", aspiration, at }),
      },
    });
  };

  return (
    <div className="page">
      <PageHeader
        emoji="🌈"
        title="Planos"
        subtitle="Metas, cartas de conversa e aspirações do casal"
      />

      {/* ===== Metas ===== */}
      <section className="plans-section">
        <div className="plans-section-head">
          <h2 className="section-title">🎈 Metas</h2>
          <button
            className="btn btn-soft btn-sm"
            onClick={() => {
              setGoalEditing(null);
              setGoalOpen(true);
            }}
          >
            + Meta
          </button>
        </div>
        {state.goals.length === 0 ? (
          <EmptyState emoji="🎈" title="Nenhuma meta ainda" message="Sonhem em curto, médio e longo prazo." />
        ) : (
          <div className="plans-grid">
            {state.goals.map((g) => (
              <GoalCard
                key={g.id}
                goal={g}
                onEdit={() => {
                  setGoalEditing(g);
                  setGoalOpen(true);
                }}
                onDelete={() => removeGoal(g)}
                onSetProgress={(value) =>
                  dispatch({ type: "upsertGoal", goal: { ...g, progress: value } })
                }
                onToggleStep={(stepId) =>
                  dispatch({
                    type: "upsertGoal",
                    goal: {
                      ...g,
                      steps: g.steps?.map((s) =>
                        s.id === stepId ? { ...s, completed: !s.completed } : s,
                      ),
                    },
                  })
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* ===== Cartas de conversa ===== */}
      <section className="plans-section">
        <div className="plans-section-head">
          <div>
            <h2 className="section-title">💌 Cartas de conversa</h2>
            <p className="muted plans-section-hint">
              Assuntos que vocês querem abrir com calma, um convite ao diálogo.
            </p>
          </div>
          <button
            className="btn btn-soft btn-sm"
            onClick={() => {
              setConvEditing(null);
              setConvOpen(true);
            }}
          >
            + Carta
          </button>
        </div>
        {state.conversations.length === 0 ? (
          <EmptyState
            emoji="💌"
            title="Nenhuma carta ainda"
            message="Guarde aqui os assuntos que vocês querem conversar com carinho."
          />
        ) : (
          <div className="plans-grid">
            {state.conversations.map((c) => (
              <ConversationCard
                key={c.id}
                conversation={c}
                featured={state.featuredConversationId === c.id}
                onEdit={() => {
                  setConvEditing(c);
                  setConvOpen(true);
                }}
                onDelete={() => removeConversation(c)}
                onToggleFeatured={() =>
                  dispatch({
                    type: "setFeaturedConversation",
                    id: state.featuredConversationId === c.id ? undefined : c.id,
                  })
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* ===== Aspirações ===== */}
      <section className="plans-section">
        <div className="plans-section-head">
          <h2 className="section-title">🌟 Aspirações</h2>
          <button
            className="btn btn-soft btn-sm"
            onClick={() => {
              setAspEditing(null);
              setAspOpen(true);
            }}
          >
            + Aspiração
          </button>
        </div>
        {state.aspirations.length === 0 ? (
          <EmptyState
            emoji="🌟"
            title="Sonhem sem limites"
            message="Desejos abertos, sem prazo nem porcentagem."
          />
        ) : (
          <div className="plans-grid aspirations">
            {state.aspirations.map((a) => (
              <AspirationCard
                key={a.id}
                aspiration={a}
                onEdit={() => {
                  setAspEditing(a);
                  setAspOpen(true);
                }}
                onDelete={() => removeAspiration(a)}
              />
            ))}
          </div>
        )}
      </section>

      <GoalForm
        open={goalOpen}
        goal={goalEditing}
        onClose={() => setGoalOpen(false)}
        onSave={(g) => {
          dispatch({ type: "upsertGoal", goal: g });
          notify({ emoji: "🎈", message: `"${g.title}" está guardada nas metas.` });
        }}
      />
      <ConversationForm
        open={convOpen}
        conversation={convEditing}
        onClose={() => setConvOpen(false)}
        onSave={(c) => {
          dispatch({ type: "upsertConversation", conversation: c });
          notify({ emoji: "💌", message: `"${c.title}" está guardada nas cartas.` });
        }}
      />
      <AspirationForm
        open={aspOpen}
        aspiration={aspEditing}
        onClose={() => setAspOpen(false)}
        onSave={(a) => {
          dispatch({ type: "upsertAspiration", aspiration: a });
          notify({ emoji: "🌟", message: `"${a.title}" está guardada nas aspirações.` });
        }}
      />
    </div>
  );
}
