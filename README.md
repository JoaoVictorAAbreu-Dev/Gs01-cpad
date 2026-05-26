# Space Predictive Analytics

## Descrição

Aplicação mobile da Global Solution 2026.1 para monitoramento inteligente de operações espaciais simuladas com dashboards analíticos, alertas automáticos, histórico de missão e apoio à decisão.

## Integrantes

- João Victor Alves de Abreu - RM: 564946 
- Luiz Henrique Barbosa Dias - RM: 562399


## Prints das Telas

Salvar os prints em `assets/screenshots/`:

- `home.png`
- `sensores.png`
- `energia.png`
- `comunicacao.png`
- `alertas.png`
- `configuracoes.png`
- `historico.png`

## Funcionalidades

- Navegação com Expo Router (Tabs + Stack).
- Dashboards de Sensores, Energia e Comunicação com gráficos em tempo real.
- Monitoramento orbital com estabilidade e drift.
- Context API para dados da missão, alertas, histórico e configurações.
- Persistência via AsyncStorage de limites, preferências e histórico da missão.
- Formulário validado para configuração de limites e integrações.
- Sistema de alertas por severidade: baixo, médio, alto e crítico.
- Notificações locais para eventos críticos (`expo-notifications`).
- Integração NASA APOD.
- Interpretação inteligente da missão com IA (Groq/Gemini).
- Interface futurista em dark mode com cards, ícones e animações suaves.

## Tecnologias

- React Native
- Expo
- Expo Router
- TypeScript
- Context API
- AsyncStorage
- react-native-chart-kit
- react-native-svg
- expo-notifications
- react-native-reanimated
- expo-linear-gradient
- @expo/vector-icons

## Como Executar

```bash
npm install
npx expo start
```

Para Android com emulador aberto:

```bash
npx expo start --android
```

## Estrutura do Projeto

- `app/`
- `components/`
- `context/`
- `hooks/`
- `services/`
- `utils/`
- `types/`
- `assets/`

## Configuração de APIs

- NASA APOD: use `DEMO_KEY` ou chave própria na tela Configurações.
- IA:
  - Provider: `none`, `groq` ou `gemini`
  - API Key: preencher na tela Configurações

## Link do Vídeo

- https://youtube.com/seu-video-global-solution

## Licença

Projeto acadêmico para fins educacionais FIAP.
