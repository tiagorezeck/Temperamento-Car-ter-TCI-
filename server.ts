import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize Gemini API client if API key is available
const ai = new GoogleGenAI();

app.post('/api/analyze', async (req, res) => {
  try {
    const { scores, profileName, archetype, comparisonProfile } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Chave GEMINI_API_KEY não configurada no servidor.' });
    }

    let prompt = '';
    if (comparisonProfile) {
      prompt = `
Você é um especialista sênior em psicologia e no modelo psicobiológico de Cloninger (Inventário de Temperamento e Caráter - TCI).
Analise a compatibilidade entre dois perfis psicológicos TCI em português do Brasil:

Perfil 1 (${profileName || 'Usuário'}):
- Busca de Novidade (NS): ${scores.NS}
- Evitação de Danos (HA): ${scores.HA}
- Dependência de Recompensa (RD): ${scores.RD}
- Persistência (P): ${scores.P}
- Autodireção (SD): ${scores.SD}
- Cooperatividade (C): ${scores.C}
- Autotranscendência (ST): ${scores.ST}
Arquétipo: ${archetype}

Perfil 2 (${comparisonProfile.name}):
- Busca de Novidade (NS): ${comparisonProfile.scores.NS}
- Evitação de Danos (HA): ${comparisonProfile.scores.HA}
- Dependência de Recompensa (RD): ${comparisonProfile.scores.RD}
- Persistência (P): ${comparisonProfile.scores.P}
- Autodireção (SD): ${comparisonProfile.scores.SD}
- Cooperatividade (C): ${comparisonProfile.scores.C}
- Autotranscendência (ST): ${comparisonProfile.scores.ST}
Arquétipo: ${comparisonProfile.archetype}

Por favor, forneça uma análise detalhada e construtiva da compatibilidade em formato JSON contendo:
1. "compatibilidadeGeral": número de 0 a 100 indicando o índice geral de afinidade.
2. "pontosFortes": array de 3 pontos fortes na sinergia entre eles.
3. "pontosAtencao": array de 2 pontos potenciais de atrito ou desafios na convivência.
4. "conselhoComunicacao": conselho prático de comunicação e entendimento mútuo.
5. "resumoNarrativo": texto envolvente de 2 parágrafos resumindo a dinâmica do relacionamento.

Responda APENAS com um objeto JSON válido, sem blocos de código Markdown adicionais se possível, ou em formato JSON puro.
`;
    } else {
      prompt = `
Você é um psicólogo especialista no Inventário de Temperamento e Caráter (TCI) de C. Robert Cloninger.
Forneça uma análise psicológica profunda e construtiva em português do Brasil para o seguinte perfil TCI (pontuações de 0 a 100):

- Busca de Novidade (NS): ${scores.NS}
- Evitação de Danos (HA): ${scores.HA}
- Dependência de Recompensa (RD): ${scores.RD}
- Persistência (P): ${scores.P}
- Autodireção (SD): ${scores.SD}
- Cooperatividade (C): ${scores.C}
- Autotranscendência (ST): ${scores.ST}
- Arquétipo Identificado: ${archetype}

Por favor, estruture a resposta em formato JSON com as seguintes chaves:
1. "perfilPsicologico": Resumo analítico profundo do temperamento e caráter (2 parágrafos).
2. "pontosFortes": Array de 3 principais fortalezas comportamentais.
3. "desafiosCrescimento": Array de 2 áreas de desenvolvimento pessoal.
4. "dicasCarreiraRelacionamentos": Sugestões práticas para ambiente profissional e relacionamentos interpessoais.
5. "reflexaoInspiradora": Uma citação ou reflexão filosófica personalizada para este perfil.

Responda estritamente em formato JSON válido, sem texto adicional.
`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error('Nenhuma resposta recebida do Gemini.');
    }

    const jsonParsed = JSON.parse(textResult);
    return res.json({ result: jsonParsed });
  } catch (err: any) {
    console.error('Erro na rota /api/analyze:', err);
    return res.status(500).json({ error: err.message || 'Erro interno ao processar análise com IA.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer();
