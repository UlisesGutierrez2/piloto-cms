---
id: catalogo-servicios-devsecops
title: Catálogo de Servicios
sidebar_label: Catálogo de Servicios
---
![]()

# Catálogo de Tareas DevSecOps 🛠️

## Objetivo ✅

Ejemplificar de manera general las tareas del DevOps y cuantificar en tiempo ejemplificativo las tareas a realizar (en JIRA), proporcionando una visión clara de las actividades diarias y su duración estimada para facilitar la planificación y la gestión del tiempo. Además, esto permitirá identificar posibles cuellos de botella y optimizar los recursos, mejorando así la eficiencia del equipo y la previsibilidad de los entregables.

## Alcance ✅

En el ámbito de DevOps, las tareas específicas pueden variar según el proyecto y la organización, pero a continuación se presenta una ejemplificación teórica de las tareas puntuales que suelen realizarse, junto con una estimación de tiempo para cada una. Estas tareas pueden incluir la configuración de pipelines de CI/CD, la automatización de pruebas, la gestión de infraestructuras como código y la implementación de herramientas de monitoreo y logging.

- - -

## Referencia Completa

Para acceder a la documentación detallada, especificaciones técnicas y actualizaciones, consulte: [DevOps-Tareas y Puntuación Standard-v3.xlsx (sharepoint.com)](#)

## Consideraciones Importantes

* **Alcance de los tiempos estimados:** Las estimaciones representan el esfuerzo ideal para la implementación en **un único entorno** (Desarrollo, Certificación o Producción). La replicación en entornos adicionales multiplicará el tiempo base.
* **Condiciones de inicio de SLA:** El Acuerdo de Nivel de Servicio (SLA) se activa de manera exclusiva una vez que la solicitud está completa, contando con todas las definiciones técnicas y los accesos requeridos habilitados de antemano.
* **Definición de métricas del catálogo:**

  * **SLA (días):** El tiempo máximo acordado y comprometido con los equipos de desarrollo para entregar la tarea completamente funcional.
  * **Lead Time (horas):** El tiempo que llevaría la tarea en caso de que se le dedique el 100% de disponibilidad de la jornada laboral, dando atención exclusiva a la misma y sin aplicar multitasking.
  * **Lead Time (Peso):** Representa la complejidad y el esfuerzo relativo de la tarea (equivalente a los *Story Points* para la planificación interna).
* El Lead Time puede variar según la complejidad específica de cada implementación.
* Para tareas no contempladas en este catálogo, consultar con el líder DevSecOps para su estimación.

- - -

## Catálogo de Tareas por Categoría

### 1. Pipelines y CI/CD

| Tarea                                          | SLA (días) | Lead Time (horas) | Lead Time (Peso) |
| ---------------------------------------------- | ---------- | ----------------- | ---------------- |
| Creación + configuración Pipeline MS           | 1.5        | 2                 | 1                |
| Creación + configuración Pipeline API          | 1.5        | 2                 | 1                |
| Creación + configuración Pipeline Frontend SPA | 1.5        | 2                 | 1                |
| Creación Pipeline Function                     | 1.5        | 2                 | 1                |
| Creación Pipeline QA - Pruebas automatizadas   | 1.5        | 2                 | 1                |
| Upgrade pipelines de MS                        | 1.5        | 2                 | 1                |
| Upgrade pipelines de API                       | 1.5        | 2                 | 1                |

:::info Nota

* Aún los valores están en estado de revisión por parte del equipo para obtener un valor ajustado a la capacidad del equipo.
  :::

### 2. Bases de Datos

| Tarea                              | SLA (días) | Lead Time (horas) | Lead Time (Peso) |
| ---------------------------------- | ---------- | ----------------- | ---------------- |
| Creación Pipeline Servidor DB      | 1.5        | 2                 | 1                |
| Creación Pipeline Base de Datos    | 1.5        | 2                 | 1                |
| Creación IaC de Azure SQL Server   | 1.5        | 2                 | 1                |
| Creación IaC de Azure SQL Database | 1.5        | 2                 | 1                |
| Migración de Base de datos         | 3          | 6                 | 2                |

:::info Nota

* Aún los valores están en estado de revisión por parte del equipo para obtener un valor ajustado a la capacidad del equipo.
  :::

### 3. Almacenamiento y Datos

| Tarea                                               | SLA (días) | Lead Time (horas) | Lead Time (Peso) |
| --------------------------------------------------- | ---------- | ----------------- | ---------------- |
| Creación Manual ADF + Pipeline Github Actions       | 1.5        | 2                 | 3                |
| Creación Manual DataBrick + pipeline Github Actions | 2 *        | 4 *               | 2 *              |
| Creación Pipeline Storage Account                   | 1 *        | 2 *               | 1 *              |
| Creación Manual Storage Account (Data Lake)         | 1 *        | 2 *               | 1 *              |
| Creación Manual Storage Account                     | \-         | 2 *               | 1 *              |

:::info Nota

* Aún los valores están en estado de revisión por parte del equipo para obtener un valor ajustado a la capacidad del equipo.
  :::

### 4. Servicios de Azure

| Tarea                                              | SLA (días) | Lead Time (horas) | Lead Time (Peso) |
| -------------------------------------------------- | ---------- | ----------------- | ---------------- |
| Creación IaC de Azure Key Vault                    | 1 *        | 2 *               | 1 *              |
| Creación IaC de Azure CDN                          | 3 *        | 8 *               | 3 *              |
| Creación IaC de Azure Redis                        | 1 *        | 2 *               | 1 *              |
| Creación IaC de Azure Logic App                    | 2 *        | 4 *               | 2 *              |
| Creación IaC de Azure Service Bus                  | 1 *        | 2 *               | 1 *              |
| Creación IaC de Azure API Product                  | 1 *        | 2 *               | 1 *              |
| Creación y configuración de url OAuth por proyecto | 1 *        | 2 *               | 1 *              |

:::info Nota

* Aún los valores están en estado de revisión por parte del equipo para obtener un valor ajustado a la capacidad del equipo.
  :::

### 5. Monitoreo y Liferay

| Tarea                                     | SLA (días) | Lead Time (horas) | Lead Time (Peso) |
| ----------------------------------------- | ---------- | ----------------- | ---------------- |
| Creación Dashboard en Grafana             | 1 *        | 2 *               | 1 *              |
| Deployar en Liferay (Dev, Cert, Prod)     | 1 *        | 1 *               | 1 *              |
| Obtener Logs de Liferay (Dev, Cert, Prod) | 2 *        | 4 *               | 2 *              |
| Pases Manuales Liferay (Dev, Cert, Prod)  | 1 *        | 2 *               | 1 *              |

:::info Nota

* Aún los valores están en estado de revisión por parte del equipo para obtener un valor ajustado a la capacidad del equipo.
  :::
