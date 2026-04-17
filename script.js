// Esempio per Node.js (Notion SDK)
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: "IL_TUO_INTEGRATION_TOKEN" });

async function getNotionStats() {
  // 1. Conta le task completate OGGI
  const today = new Date().toISOString().split('T')[0];
  const taskQuery = await notion.databases.query({
    database_id: "ID_DATABASE_TASK",
    filter: {
      and: [
        { property: "Data", date: { equals: today } },
        { property: "Stato", checkbox: { equals: true } }
      ]
    }
  });

  // 2. Leggi streak e stato congelamento
  const statsQuery = await notion.databases.query({
    database_id: "ID_DATABASE_STATS",
    page_size: 1
  });

  const page = statsQuery.results[0].properties;

  return {
    streak: page.Streak.number, // Nome della tua colonna numero
    isFrozen: page.Frozen.checkbox, // O il tuo sistema di congelamento
    tasksToday: taskQuery.results.length
  };
}