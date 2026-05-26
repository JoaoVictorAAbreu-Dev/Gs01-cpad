# Space Predictive Analytics

<p align="center">
  <img src="./assets/logo.png" alt="Space Predictive Analytics" width="260" />
</p>

Aplicativo mobile com Expo Router para monitoramento espacial com dashboards, alertas por limiar e análise de telemetria simulada.

## Prints

Adicionar imagens em `assets/screenshots/`:

- `home.png`
- `sensores.png`
- `energia.png`
- `comunicacao.png`
- `alertas.png`
- `configuracoes.png`

## Requisitos atendidos

- Expo Router com navegação por tabs e rotas funcionais.
- 3 dashboards principais: Sensores, Energia e Comunicação.
- Context API consumida em múltiplas telas.
- AsyncStorage persistindo limites de alerta e preferências da API NASA.
- Formulário controlado com validação e feedback de erro/sucesso.
- Alertas automáticos por limiares críticos (temperatura, bateria, sinal).
- Interface espacial em dark mode.
- Código tipado e componentizado.
- Logo em splash, home, README e ícone do app.

## Estrutura

- `app/`: rotas e telas (Expo Router).
- `components/`: componentes reutilizáveis de UI.
- `context/`: estado global da missão.
- `hooks/`: hooks de acesso ao contexto.
- `services/`: simulação, NASA APOD e persistência.
- `utils/`: tema e regras de alertas.
- `types/`: contratos de tipos.
- `assets/`: logo e arquivos estáticos.

## Como executar (Expo Go)

```bash
npm install
npx expo start
```

Abra o app Expo Go no celular e escaneie o QR code.

## Como executar (Android Studio + emulador)

```bash
npm install
npx expo start --android
```

Com um AVD já iniciado no Android Studio, o Expo abre o app no emulador.

## Scripts

- `npm run start`
- `npm run android`
- `npm run ios`
- `npm run web`
- `npm run typecheck`

## NASA APOD

- Chave padrão: `DEMO_KEY`
- Para chave própria: tela Configurações > campo `NASA API Key`.
