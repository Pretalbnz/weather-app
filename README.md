# Weather App

Aplicação web (React + TypeScript) para consultar o tempo atual e a previsão de 5 dias para qualquer cidade, com **gráfico da evolução da temperatura**, **mapa de temperatura** centrado na cidade e **alternância de unidades** (°C | °F). UI responsiva e leve.

## ✨ Funcionalidades

- Pesquisa com **autocomplete** de cidades  
- **Tempo atual** (temperatura, descrição, humidade, vento, pressão)  
- **Previsão 5 dias** (min/máx + ícone)  
- **Gráfico** de evolução das temperaturas (máx/min)  
- **Mapa de temperatura** (OpenWeather tiles) centrado na cidade  
- **Unidades**: Celsius / Fahrenheit (sem refresh da página)  
- **Pesquisas recentes** (localStorage)  
- **Mensagens de erro** contextualizadas  
- **Empty state** quando ainda não foi escolhida uma cidade

## 🧰 Stack

- React + TypeScript  
- styled-components  
- Recharts (gráfico)  
- Leaflet + react-leaflet (mapa)  
- OpenWeatherMap API (dados + tiles)  
- Vercel (deploy)

## 📦 Instalação

```bash
# 1) Clonar
git clone https://github.com/<teu-user>/<teu-repo>.git
cd <teu-repo>

# 2) Dependências
npm install

# 3) Variáveis de ambiente
cp .env.example .env
# abre .env e define:
# REACT_APP_WEATHER_API_KEY=xxxxxxxxxxxxxxxx

# 4) Desenvolvimento
npm start
# http://localhost:3000


