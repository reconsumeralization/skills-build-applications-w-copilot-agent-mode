// mongodb.ts
// MongoDB utility for saving/loading diagrams and execution results

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'mermaidcopilot';

let client: any = null;

export async function getDb(): Promise<any> {
    if (!client) {
        const { MongoClient } = await import('mongodb');
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db(dbName);
}

export async function saveDiagram(userId: string, diagram: string) {
    const db = await getDb();
    const diagrams = db.collection('diagrams');
    await diagrams.insertOne({ userId, diagram, createdAt: new Date() });
}

export async function loadDiagrams(userId: string) {
    const db = await getDb();
    const diagrams = db.collection('diagrams');
    return diagrams.find({ userId }).sort({ createdAt: -1 }).toArray();
}

export async function saveExecutionResult(nodeId: string, result: any) {
    const db = await getDb();
    const results = db.collection('executionResults');
    await results.insertOne({ nodeId, result, createdAt: new Date() });
}

export async function loadExecutionResults(nodeId: string) {
    const db = await getDb();
    const results = db.collection('executionResults');
    return results.find({ nodeId }).sort({ createdAt: -1 }).toArray();
}
