interface ComponentMeta {
    name: string;
    uuid: string;
}

interface ComponentDependency {
    component: ComponentMeta;
    name: string;
    dependencies: string[]
}

interface KeyedComponents {
    [key: string]: ComponentMeta
}

interface ComponentConfig {
    component: ComponentMeta;
    name:string;
    config: {
        dependencies: {
            [key: string]: string
        };
        devDependencies: {
            [key: string]: string
        };
    }
}

interface ComponentConfigCleaned {
    component: ComponentMeta;
    name: string;
    config: {
        dependencies: string[]
    }
}

interface ComponentDependency {
    component: ComponentMeta;
    name: string;
    dependencies: string[]
}

export {
    ComponentDependency,
    ComponentConfig,
    ComponentMeta,
    ComponentConfigCleaned,
    KeyedComponents,
}
