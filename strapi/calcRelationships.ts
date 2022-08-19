import {writeFileSync} from "fs";

import { ComponentMeta, ComponentConfig, ComponentDependency, ComponentConfigCleaned, KeyedComponents} from "./interfaces";

const components: ComponentMeta[] = [
  {
    "uuid": "ATU-1",
    "name": "admin-test-utils"
  },
  {
    "uuid": "CLI-1",
    "name": "cli/create-strapi-app"
  },
  {
    "uuid": "CLI-2",
    "name": "cli/create-strapi-starter"
  },
  {
    "uuid": "CORE-1",
    "name": "core/admin/admin"
  },
  {
    "uuid": "CORE-2",
    "name": "core/admin/server"
  },
  {
    "uuid": "CORE-3",
    "name": "core/admin/ee/admin"
  },
  {
    "uuid": "CORE-4",
    "name": "core/admin/ee/server"
  },
  {
    "uuid": "CORE-5",
    "name": "core/content-manager"
  },
  {
    "uuid": "CORE-6",
    "name": "core/content-type-builder/admin"
  },
  {
    "uuid": "CORE-7",
    "name": "core/content-type-builder/server"
  },
  {
    "uuid": "CORE-8",
    "name": "core/database"
  },
  {
    "uuid": "CORE-9",
    "name": "core/email/admin"
  },
  {
    "uuid": "CORE-10",
    "name": "core/email/server"
  },
  {
    "uuid": "CORE-11",
    "name": "core/helper-plugin"
  },
  {
    "uuid": "CORE-12",
    "name": "core/strapi"
  },
  {
    "uuid": "CORE-13",
    "name": "core/upload/admin"
  },
  {
    "uuid": "CORE-14",
    "name": "core/upload/server"
  },
  {
    "uuid": "CORE-15",
    "name": "core/utils"
  },
  {
    "uuid": "GEN-1",
    "name": "generators/app"
  },
  {
    "uuid": "GEN-2",
    "name": "generators/generators"
  },
  {
    "uuid": "PLG-1",
    "name": "plugins/documentation/admin"
  },
  {
    "uuid": "PLG-2",
    "name": "plugins/documentation/server"
  },
  {
    "uuid": "PLG-3",
    "name": "plugins/graphql/admin"
  },
  {
    "uuid": "PLG-4",
    "name": "plugins/graphql/server"
  },
  {
    "uuid": "PLG-5",
    "name": "plugins/i18n/admin"
  },
  {
    "uuid": "PLG-6",
    "name": "plugins/i18n/server"
  },
  {
    "uuid": "PLG-7",
    "name": "plugins/sentry/admin"
  },
  {
    "uuid": "PLG-8",
    "name": "plugins/sentry/server"
  },
  {
    "uuid": "PLG-9",
    "name": "plugins/users-permissions/admin"
  },
  {
    "uuid": "PLG-10",
    "name": "plugins/users-permissions/server"
  },
  {
    "uuid": "PROV-1",
    "name": "providers/email-amazon-ses"
  },
  {
    "uuid": "PROV-2",
    "name": "providers/email-mailgun"
  },
  {
    "uuid": "PROV-3",
    "name": "providers/email-nodemailer"
  },
  {
    "uuid": "PROV-4",
    "name": "providers/email-sendgrid"
  },
  {
    "uuid": "PROV-5",
    "name": "providers/email-sendmail"
  },
  {
    "uuid": "PROV-6",
    "name": "providers/upload-aws-s3"
  },
  {
    "uuid": "PROV-7",
    "name": "providers/upload-cloudinary"
  },
  {
    "uuid": "PROV-8",
    "name": "providers/upload-local"
  },
  {
    "uuid": "PROV-9",
    "name": "providers/upload-rackspace"
  },
  {
    "uuid": "UTI-1",
    "name": "utils/babel-plugin-switch-ee-ce"
  },
  {
    "uuid": "UTI-2",
    "name": "utils/logger"
  },
  {
    "uuid": "DES-1",
    "name": "strapi-design-system"
  },
  {
    "uuid": "DES-2",
    "name": "strapi-icons"
  }
]

const cleanName = (componentName: string) => {
  // core/admin is a special case because this is where the admin application of strapi is built.
  if(componentName.startsWith("core/admin")){
    return "core/admin";
  }
  return componentName.replace("/server", "").replace("/admin", "");
}

const getAllPackageJsons = (): ComponentConfig[] => {
    return components.map((component, _index) => {
        let prefix = "./packages";
        if(component.uuid.includes("DES")){
          prefix = "../design-system/packages"
        }
        const componentName = cleanName(component.name)
        console.log(`${prefix}/${component.name} -> ${prefix}/${componentName}/package.json`)
        const config = require(`${prefix}/${componentName}/package.json`);
        return {
            component: component,
            name: config.name.replace("@strapi/", ""),
            config: {
                dependencies: config.dependencies || [],
                devDependencies: config.devDependencies || []
            }
        }
    })
}

const filterAllStrapiDependencies = (configs: ComponentConfig[]): ComponentConfigCleaned[] => {
    return configs.map((config) => ({
        component: config.component,
        name: config.name,
        config: {
            dependencies: (config.config.dependencies || config.config.devDependencies) ? Object.keys({...(config.config.dependencies || {}), ...(config.config.devDependencies || {})}).filter(dependency => dependency.includes("@strapi")).map(dependency => dependency.replace("@strapi/", "")) : [],
        }
    }));
}

const createDependencyTrees = (filteredConfigs: ComponentConfigCleaned[]): ComponentDependency[] => {
    const keyedComponents: KeyedComponents = filteredConfigs.reduce((base, component) => ({
            ...base,
            [component.name]: {
              uuid: component.component.uuid,
              name: component.component.name
            }
    }), {});
    console.log(keyedComponents)
    return filteredConfigs.map(config => {
      return ({
        component: config.component,
        name: config.name,
        dependencies: config.config.dependencies.map(dependency => {
          return keyedComponents[dependency].uuid
        })
      })
    });
}

const componentConfigs = getAllPackageJsons();
const cleanedConfig = filterAllStrapiDependencies(componentConfigs);
const dependencies = createDependencyTrees(cleanedConfig)
// MATCH (n), (m) WHERE n.uuid IN m.dependencies CREATE (n)-[:DEPENDENCYOF]->(m)
writeFileSync("./dependencies.json", JSON.stringify(dependencies.map(dep => ({
  uuid: dep.component.uuid,
  name: dep.component.name,
  dependencies: dep.dependencies,
})), null, 2));
