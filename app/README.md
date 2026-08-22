# Aplicação AlertaRS

Primeiro incremento funcional do painel, ainda sem consumo de serviços externos. Os dados simulados entram por `src/services/hydrologyRepository.js`, o mesmo contrato que será implementado pelo futuro adaptador da ANA.

```bash
npm install
npm run dev
```

Verificações: `npm test`, `npm run lint` e `npm run build`.

> Os dados em `mockStations.js` são fictícios e nunca devem ser apresentados como alerta real.
