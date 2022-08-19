const {writeFileSync} = require("fs");
import { ComponentMeta, ComponentConfig, ComponentDependency, ComponentConfigCleaned, KeyedComponents} from "./interfaces";

const components: ComponentMeta[] = [
    {
        "name":"apw/executeAction",
        "uuid":"APW-1"
    },{
        "name":"apw/scheduleAction",
        "uuid":"APW-2"
    },{
        "name":"fileManager/download",
        "uuid":"FM-1"
    },{
        "name":"fileManager/manage",
        "uuid":"FM-2"
    },{
        "name":"fileManager/transform",
        "uuid":"FM-3"
    },{
        "name":"graphql",
        "uuid":"GQL-1"
    },{
        "name":"headlessCMS",
        "uuid":"HCMS-1"
    },{
        "name":"pageBuilder/exportPages/combine",
        "uuid":"PB-1"
    },{
        "name":"pageBuilder/exportPages/process",
        "uuid":"PB-2"
    },{
        "name":"pageBuilder/importPages/create",
        "uuid":"PB-3"
    },{
        "name":"pageBuilder/importPages/process",
        "uuid":"PB-4"
    },{
        "name":"pageBuilder/updateSettings",
        "uuid":"PB-5"
    },{
        "name":"api-admin-users-cognito",
        "uuid":"API-1"
    },
    {
        "name":"api-admin-users-cognito-so-ddb",
        "uuid":"API-2"
    },
    {
        "name":"api-apw",
        "uuid":"API-3"
    },
    {
        "name":"api-apw-scheduler-so-ddb",
        "uuid":"API-4"
    },
    {
        "name":"api-authentication",
        "uuid":"API-5"
    },
    {
        "name":"api-authentication-cognito",
        "uuid":"API-6"
    },
    {
        "name":"api-cognito-authenticator",
        "uuid":"API-7"
    },
    {
        "name":"api-dynamodb-to-elasticsearch",
        "uuid":"API-8"
    },
    {
        "name":"api-elasticsearch",
        "uuid":"API-9"
    },
    {
        "name":"api-file-manager",
        "uuid":"API-10"
    },
    {
        "name":"api-file-manager-ddb",
        "uuid":"API-11"
    },
    {
        "name":"api-file-manager-ddb-es",
        "uuid":"API-12"
    },
    {
        "name":"api-file-manager-s3",
        "uuid":"API-13"
    },
    {
        "name":"api-form-builder",
        "uuid":"API-14"
    },
    {
        "name":"api-form-builder-so-ddb",
        "uuid":"API-15"
    },
    {
        "name":"api-form-builder-so-ddb-es",
        "uuid":"API-16"
    },
    {
        "name":"api-headless-cms",
        "uuid":"API-17"
    },
    {
        "name":"api-headless-cms-ddb",
        "uuid":"API-18"
    },
    {
        "name":"api-headless-cms-ddb-es",
        "uuid":"API-19"
    },
    {
        "name":"api-i18n",
        "uuid":"API-20"
    },
    {
        "name":"api-i18n-content",
        "uuid":"API-21"
    },
    {
        "name":"api-i18n-ddb",
        "uuid":"API-22"
    },
    {
        "name":"api-page-builder",
        "uuid":"API-23"
    },
    {
        "name":"api-page-builder-import-export",
        "uuid":"API-24"
    },
    {
        "name":"api-page-builder-import-export-so-ddb",
        "uuid":"API-25"
    },
    {
        "name":"api-page-builder-so-ddb",
        "uuid":"API-26"
    },
    {
        "name":"api-page-builder-so-ddb-es",
        "uuid":"API-27"
    },
    {
        "name":"api-prerendering-service",
        "uuid":"API-28"
    },
    {
        "name":"api-prerendering-service-aws",
        "uuid":"API-29"
    },
    {
        "name":"api-prerendering-service-so-ddb",
        "uuid":"API-30"
    },
    {
        "name":"api-security",
        "uuid":"API-31"
    },
    {
        "name":"api-security-cognito",
        "uuid":"API-32"
    },
    {
        "name":"api-security-okta",
        "uuid":"API-33"
    },
    {
        "name":"api-security-so-ddb",
        "uuid":"API-34"
    },
    {
        "name":"api-tenancy",
        "uuid":"API-35"
    },
    {
        "name":"api-tenancy-so-ddb",
        "uuid":"API-36"
    },
    {
        "name":"api-tenant-manager",
        "uuid":"API-37"
    },
    {
        "name":"api-theme-manager",
        "uuid":"API-38"
    },
    {
        "name":"api-upgrade",
        "uuid":"API-39"
    },
    {
        "name":"app",
        "uuid":"APP-1"
    },
    {
        "name":"app-admin",
        "uuid":"APP-2"
    },
    {
        "name":"app-admin-cognito",
        "uuid":"APP-3"
    },
    {
        "name":"app-admin-core",
        "uuid":"APP-4"
    },
    {
        "name":"app-admin-okta",
        "uuid":"APP-5"
    },
    {
        "name":"app-admin-rmwc",
        "uuid":"APP-6"
    },
    {
        "name":"app-admin-users-cognito",
        "uuid":"APP-7"
    },
    {
        "name":"app-apw",
        "uuid":"APP-8"
    },
    {
        "name":"app-cognito-authenticator",
        "uuid":"APP-9"
    },
    {
        "name":"app-file-manager",
        "uuid":"APP-10"
    },
    {
        "name":"app-file-manager-s3",
        "uuid":"APP-11"
    },
    {
        "name":"app-form-builder",
        "uuid":"APP-12"
    },
    {
        "name":"app-graphql-playground",
        "uuid":"APP-13"
    },
    {
        "name":"app-headless-cms",
        "uuid":"APP-14"
    },
    {
        "name":"app-i18n",
        "uuid":"APP-15"
    },
    {
        "name":"app-i18n-content",
        "uuid":"APP-16"
    },
    {
        "name":"app-page-builder",
        "uuid":"APP-17"
    },
    {
        "name":"app-page-builder-editor",
        "uuid":"APP-18"
    },
    {
        "name":"app-page-builder-elements",
        "uuid":"APP-19"
    },
    {
        "name":"app-plugin-admin-welcome-screen",
        "uuid":"APP-20"
    },
    {
        "name":"app-security",
        "uuid":"APP-21"
    },
    {
        "name":"app-security-access-management",
        "uuid":"APP-22"
    },
    {
        "name":"app-serverless-cms",
        "uuid":"APP-23"
    },
    {
        "name":"app-tenancy",
        "uuid":"APP-24"
    },
    {
        "name":"app-tenant-manager",
        "uuid":"APP-25"
    },
    {
        "name":"app-theme-manager",
        "uuid":"APP-26"
    },
    {
        "name":"app-typeform",
        "uuid":"APP-27"
    },
    {
        "name":"aws-helpers",
        "uuid":"AWSL-1"
    },
    {
        "name":"aws-layers",
        "uuid":"AWSL-2"
    },
    {
        "name":"cli",
        "uuid":"CLI-1"
    },
    {
        "name":"cli-plugin-deploy-pulumi",
        "uuid":"CLI-2"
    },
    {
        "name":"cli-plugin-scaffold",
        "uuid":"CLI-3"
    },
    {
        "name":"cli-plugin-scaffold-admin-app-module",
        "uuid":"CLI-4"
    },
    {
        "name":"cli-plugin-scaffold-ci",
        "uuid":"CLI-5"
    },
    {
        "name":"cli-plugin-scaffold-full-stack-app",
        "uuid":"CLI-6"
    },
    {
        "name":"cli-plugin-scaffold-graphql-api",
        "uuid":"CLI-7"
    },
    {
        "name":"cli-plugin-scaffold-graphql-service",
        "uuid":"CLI-8"
    },
    {
        "name":"cli-plugin-scaffold-react-app",
        "uuid":"CLI-9"
    },
    {
        "name":"cli-plugin-scaffold-react-component",
        "uuid":"CLI-10"
    },
    {
        "name":"cli-plugin-workspaces",
        "uuid":"CLI-11"
    },
    {
        "name":"commodo",
        "uuid":"COMMODO-1"
    },
    {
        "name":"create-webiny-project",
        "uuid":"CWP-1"
    },
    {
        "name":"cwp-template-aws",
        "uuid":"CWP-2"
    },
    {
        "name":"db",
        "uuid":"DB-1"
    },
    {
        "name":"db-dynamodb",
        "uuid":"DB-2"
    },
    {
        "name":"error",
        "uuid":"ERR-1"
    },
    {
        "name":"form",
        "uuid":"FORM-1"
    },
    {
        "name":"global-config",
        "uuid":"GLOCO-1"
    },
    {
        "name":"handler",
        "uuid":"HANDLER-1"
    },
    {
        "name":"handler-args",
        "uuid":"HANDLER-2"
    },
    {
        "name":"handler-aws",
        "uuid":"HANDLER-3"
    },
    {
        "name":"handler-client",
        "uuid":"HANDLER-4"
    },
    {
        "name":"handler-db",
        "uuid":"HANDLER-5"
    },
    {
        "name":"handler-graphql",
        "uuid":"HANDLER-6"
    },
    {
        "name":"handler-http",
        "uuid":"HANDLER-7"
    },
    {
        "name":"handler-logs",
        "uuid":"HANDLER-8"
    },
    {
        "name":"i18n",
        "uuid":"I18N-1"
    },
    {
        "name":"i18n-react",
        "uuid":"I18N-2"
    },
    {
        "name":"ioc",
        "uuid":"IOC-1"
    },
    {
        "name":"plugins",
        "uuid":"PLUG-1"
    },
    {
        "name":"project-utils",
        "uuid":"PROT-1"
    },
    {
        "name":"pubsub",
        "uuid":"PUBSUB-1"
    },
    {
        "name":"pulumi-aws",
        "uuid":"PUL-1"
    },
    {
        "name":"pulumi-sdk",
        "uuid":"PUL-2"
    },
    {
        "name":"react-composition",
        "uuid":"REAUTI-1"
    },
    {
        "name":"react-rich-text-renderer",
        "uuid":"REAUTI-2"
    },
    {
        "name":"react-router",
        "uuid":"REAUTI-3"
    },
    {
        "name":"storybook-utils",
        "uuid":"STORTI-1"
    },
    {
        "name":"telemetry",
        "uuid":"TEL-1"
    },
    {
        "name":"ui",
        "uuid":"UI-1"
    },
    {
        "name":"ui-composer",
        "uuid":"UI-2"
    },
    {
        "name":"utils",
        "uuid":"UTIL-1"
    },
    {
        "name":"validation",
        "uuid":"VAL-1"
    },
    {
        "name":"where-parser",
        "uuid":"WHEP-1"
    },
    {
        "name": "admin/code",
        "uuid": "APPADM-1"
    },
    {
        "name": "storage/code/dynamoToElastic",
        "uuid": "APPSTOR-1"
    },
    {
        "name": "theme",
        "uuid": "APPTHM-1"
    },
    {
        "name": "website/code",
        "uuid": "APPWS-1"
    },
    {
        "name": "website/prerendering/flush",
        "uuid": "APPWS-2"
    },
    {
        "name": "website/prerendering/render",
        "uuid": "APPWS-3"
    },
    {
        "name": "website/prerendering/subscribe",
        "uuid": "APPWS-4"
    }
];

const relevantComponents: string[] = ["APW-1",
    "APW-2",
    "FM-1",
    "FM-2",
    "FM-3",
    "GQL-1",
    "HCMS-1",
    "PB-1",
    "PB-2",
    "PB-3",
    "PB-4",
    "PB-5",
    "API-1",
    "API-2",
    "API-3",
    "API-4",
    "API-5",
    "API-7",
    "API-8",
    "API-9",
    "API-10",
    "API-11",
    "API-12",
    "API-13",
    "API-14",
    "API-15",
    "API-17",
    "API-18",
    "API-20",
    "API-21",
    "API-22",
    "API-23",
    "API-24",
    "API-25",
    "API-26",
    "API-28",
    "API-29",
    "API-30",
    "API-31",
    "API-32",
    "API-33",
    "API-34",
    "API-35",
    "API-36",
    "API-37",
    "API-39",
    "CLI-1",
    "DB-1",
    "DB-2",
    "ERR-1",
    "HANDLER-1",
    "HANDLER-2",
    "HANDLER-3",
    "HANDLER-4",
    "HANDLER-5",
    "HANDLER-6",
    "HANDLER-7",
    "HANDLER-8",
    "PLUG-1",
    "PROT-1",
    "PROT-1",
    "PUBSUB-1",
    "UTIL-1",
    "VAL-1",
    "APPWS-2",
    "APPWS-3",
    "APPWS-4"
];

const getAllPackageJsons = (): ComponentConfig[] => {
    return components.map((component, index) => {
        let prefix = "./packages";
        if(index < 12){
            prefix = "./api/code"
        } else if(components.length -index < 8){
            prefix = "./apps"
        }
        console.log(`${prefix}/${component.name}/package.json`)
        const config = require(`${prefix}/${component.name}/package.json`);
        return {
            component: component,
            config: {
                dependencies: config.dependencies,
                devDependencies: config.devDependencies
            }
        }
    })
}

const filterAllWebinyDependencies = (configs: ComponentConfig[]): ComponentConfigCleaned[] => {
    return configs.map((config) => ({
        component: config.component,
        config: {
            dependencies: (config.config.dependencies || config.config.devDependencies) ? Object.keys({...(config.config.dependencies || {}), ...(config.config.devDependencies || {})}).filter(dependency => dependency.includes("@webiny")).map(dependency => dependency.replace("@webiny/", "")) : [],
        }
    }));
}

const createDependencyTrees = (filteredConfigs: ComponentConfigCleaned[]): ComponentDependency[] => {
    const keyedComponents: KeyedComponents = components.reduce((base, component) => ({
        ...base,
        [component.name]: component
    }), {});
    return filteredConfigs.map(config => ({
        component: config.component,
        dependencies: config.config.dependencies.map(dependency => {
            return keyedComponents[dependency].uuid
        })
    }));
}

const componentConfigs = getAllPackageJsons();
const cleanedConfig = filterAllWebinyDependencies(componentConfigs);
const dependencies = createDependencyTrees(cleanedConfig)
const apiDependencies = dependencies.filter(dependency => relevantComponents.includes(dependency.component.uuid))
// MATCH (n), (m) WHERE n.uuid IN m.dependencies CREATE (n)-[:DEPENDENCYOF]->(m)
writeFileSync("./dependencies.json", JSON.stringify(apiDependencies, null, 2));