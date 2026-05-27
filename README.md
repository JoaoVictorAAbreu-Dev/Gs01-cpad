# Space Predictive Analytics

<p align="center">
  <img src="./assets/logo.png" alt="Space Predictive Analytics" width="280" />
</p>

## Descrição

Plataforma mobile institucional para monitoramento espacial inteligente, com telemetria simulada em tempo real, dashboards operacionais e suporte à decisão por IA.

## Integrantes

- João Victor Alves de Abreu - RM 564946
- Luiz Henrique Barbosa Dias - RM 562399

## Prints Reais

Adicionar capturas em `assets/screenshots/`:

- `home.png`
- `sensores.png`
- `energia.png`
- `comunicacao.png`
- `alertas.png`
- `configuracoes.png`
- `historico.png`

## Funcionalidades

- Mission Control Dashboard na Home com status consolidado.
- Dashboards técnicos de Sensores, Energia e Comunicação com gráficos históricos.
- Monitoramento de estabilidade orbital.
- Alertas automáticos com severidade, subsistema, timestamp e recomendação operacional.
- Persistência de configurações e histórico com AsyncStorage.
- Integração NASA APOD (imagem/título/descrição/fallback/loading).
- Análise inteligente com IA (Groq/Gemini).
- Notificações locais para eventos críticos.

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

## APIs Utilizadas

- NASA APOD API
- Groq API (opcional)
- Google Gemini API (opcional)

## Configuração de Ambiente

Crie `.env` na raiz com:

```bash
EXPO_PUBLIC_NASA_API_KEY=sua_chave_nasa
```

A chave de IA é configurada em runtime pela tela Configurações.

## Como Executar

```bash
npm install
npx expo start
```

Android (emulador aberto):

```bash
npx expo start --android
```

## Arquitetura

- `app/`
- `components/`
- `context/`
- `hooks/`
- `services/`
- `utils/`
- `types/`
- `assets/`

## Vídeo

- https://youtube.com/seu-video-global-solution

## Licença

Uso acadêmico - FIAP Global Solution 2026.1.
