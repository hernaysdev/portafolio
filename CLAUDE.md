# Portafolio — hernays.dubenails.com

HTML/CSS/JS en `src/public/` + Express (`src/app.js`, `/correo` solo POST). El CV es `src/public/assets/cv-hernays-gonzalez.pdf`.

## 🚀 Despliegue: push a `main` = PRODUCCIÓN (pipeline automático desde 2026-11-19)

**No hay ambiente intermedio.** Cada push a `main` corre GitHub Actions (`.github/workflows/ci.yml`) y, si las revisiones pasan, **publica directo en producción** sin que nadie apriete nada (funciona aunque la Mac mini esté apagada).

Reglas para cualquier agente o sesión:

1. **Push a `main` solo con el OK del user** y con todo verificado en local (build/tests). Pushear = desplegar.
2. **Para algo sin terminar: rama + PR.** En un PR el pipeline corre las revisiones pero **no despliega**.
3. **No desplegar a mano ni editar en el servidor** (caja `13.140.40.51`, usuario `webs`). La caja solo acepta lo que llega por el pipeline; un cambio hecho allá se pisa o frena el siguiente despliegue.
4. **Después de pushear, verificar** que la corrida termine en verde (pestaña *Actions* del repo) y que el sitio responda. Si el sitio no responde tras reiniciar, la caja **vuelve sola a la versión anterior** y la corrida queda en rojo: leer el log antes de reintentar.
5. **El `.env` de producción vive solo en la caja** y el despliegue nunca lo toca. No commitear `.env` ni secretos.
6. **Commits sin atribución a Claude** (nada de `Co-Authored-By: Claude` ni "Generated with Claude Code"), autor `hernaysdev <hernays.dev@gmail.com>`.
7. La llave de despliegue es el secreto `CAJA_DEPLOY_KEY` del repo y en la caja solo puede ejecutar el script de despliegue de este sitio (forced command). No cambiar el workflow para que haga otra cosa por ssh: no va a poder.

### Cadena de este repo

push a `main` → revisiones (sintaxis de los JS, el servidor arranca y sirve página/CSS/JS/CV, `/correo` vacío da 400) → `git archive src package.json package-lock.json` a la caja → `/usr/local/bin/desplegar-portafolio`: reemplaza `src/`, `npm ci` si cambió el lock, reinicia pm2 `app` y verifica.

- Solo viaja `src/` + `package*.json`. Algo fuera de `src/` no llega a producción.
- `package-lock.json` va versionado y es el que corre en producción: si agregas una dependencia, commitealo.
