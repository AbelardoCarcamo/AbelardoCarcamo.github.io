# Nexium Security

Proyecto academico estatico para una empresa ficticia de ciberseguridad en Panama.

## Caracteristicas

- Web corporativa con historia, mision, vision, valores, organigrama y analisis empresarial.
- Servicios: diagnostico de seguridad, hardening de sistemas y monitoreo SOC.
- Modulo contable en `pages/accounting.html`.
- Calculo frontend de estado de resultados y balance general.
- Catalogo visual de cuentas contables.
- Diseno dark mode tipo SaaS con Bootstrap 5 CDN, HTML5, CSS3 y JavaScript vanilla.

## Estructura

```text
nexium-security/
├── index.html
├── 404.html
├── README.md
├── LICENSE
├── robots.txt
├── sitemap.xml
├── CNAME
├── .gitignore
├── pages/
│   └── accounting.html
├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   └── accounting.js
│   ├── img/
│   │   ├── logo/
│   │   ├── backgrounds/
│   │   ├── icons/
│   │   ├── services/
│   │   └── team/
│   ├── fonts/
│   ├── favicon/
│   └── docs/
└── data/
    ├── company.json
    ├── services.json
    ├── accounts.json
    ├── balance.json
    └── income-statement.json
```

## Despliegue en GitHub Pages

1. Crear un repositorio llamado `nexium-security`.
2. Subir todos los archivos de esta carpeta a la rama principal.
3. Activar GitHub Pages desde `Settings > Pages`.
4. Seleccionar `Deploy from a branch` y la carpeta `/root`.
5. Si no se usara dominio personalizado, eliminar o editar `CNAME`.

## Funciones JavaScript obligatorias

El archivo `assets/js/accounting.js` expone:

- `addIncome()`
- `addExpense()`
- `calculateIncomeStatement()`
- `calculateBalanceSheet()`
- `renderTables()`

## Licencia

Uso academico. Ver `LICENSE`.
