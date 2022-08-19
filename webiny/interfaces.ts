interface ComponentMeta {
    name: string;
    uuid: string;
}

interface ComponentDependency {
    component: ComponentMeta;
    dependencies: string[]
}

interface KeyedComponents {
    [key: string]: ComponentMeta
}

interface ComponentConfig {
    component: ComponentMeta;
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
    config: {
        dependencies: string[]
    }
}

interface ComponentDependency {
    component: ComponentMeta;
    dependencies: string[]
}

export {
    ComponentDependency,
    ComponentConfig,
    ComponentMeta,
    ComponentConfigCleaned,
    KeyedComponents,
}
