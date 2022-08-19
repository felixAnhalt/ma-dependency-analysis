import neo4j from "neo4j-driver";

const uri = 'uri';
const user = 'neo4j';
const password = 'pw';

import dependencies from "./dependencies.json";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session();

interface ComponentMeta {
    name: string;
    uuid: string;
}

interface ComponentDependency {
    component: ComponentMeta;
    dependencies: string[]
}

(async () => {
    try{
        const stringifyAndReplaceKeys = (obj) => JSON.stringify({
            ...obj.component,
            dependencies: obj.dependencies
        }, undefined, 0)
            .replace(/"component"/g, "component")
            .replace(/"name"/g, "name")
            .replace(/"uuid"/g, "uuid")
            .replace(/"dependencies"/g, "dependencies")
        const writeQuery = (component: ComponentDependency) => `CREATE(dep:Component ${stringifyAndReplaceKeys(component)})`;
    for(const component of dependencies) {
        console.log(component)
        const writeResult = await session.writeTransaction(tx =>
            tx.run(writeQuery(component))
        )
    }

} catch (error) {
    console.error('Something went wrong: ', error)
} finally {
    await session.close()
}

// Don't forget to close the driver connection when you're finished with it
await driver.close()
})()

// MATCH (n), (m) WHERE n.uuid IN m.dependencies CREATE (n)-[:DEPENDENCYOF]->(m)
