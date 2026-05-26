# Space Predictive Analytics

<p align="center">
  <img src="./assets/logo.png" alt="Space Predictive Analytics" width="260" />
</p>

App mobile com Expo Router para monitoramento espacial com dashboards, alertas automáticos e simulação de telemetria.

## Prints

Adicione prints em `assets/screenshots/` e referencie aqui:

- Home
- Sensores
- Energia
- Comunicação
- Alertas
- Configurações

## Funcionalidades

- Dashboards de Sensores, Energia e Comunicação com cards e gráficos simples.
- Alertas automáticos: temperatura alta, energia baixa e falha de sinal.
- Context API para dados da missão, alertas e configurações.
- Persistência com AsyncStorage para limites e preferências.
- Formulário validado de configurações com feedback de erro/sucesso.
- Integração NASA APOD API.
- Splash e ícone usando a logo do projeto.

## Arquitetura

- `app/`: rotas e telas com Expo Router.
- `components/`: UI reutilizável.
- `context/`: estado global da missão.
- `hooks/`: hooks de acesso ao contexto.
- `services/`: simulação, storage e NASA API.
- `utils/`: tema e regras de alerta.
- `types/`: tipagens de domínio.
- `assets/`: logo e imagens estáticas.

## Rodar projeto (modelo Expo Router)

```bash
npm install
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo start
```

## Rodar no Android Studio (emulador aberto)

```bash
npm install
npx expo start --android
```

## NASA APOD

- Chave padrão: `DEMO_KEY`
- Para produção, configure sua chave na tela Configurações.