import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

import auditLogsRoutes from './routes/auditLogsController';
import workspaceRoutes from './routes/workspaceController';
import appRoutes from './routes/appController';
import searchRoutes from './routes/searchController';
import importExportRoutes from './routes/importExportController';
import bulkOperationsRoutes from './routes/bulkOperationsController';
import emailRoutes from './routes/emailController';
import taskRoutes from './routes/taskController';
import accessControlRoutes from './routes/accessControlController';
import usageTrackingRoutes from './routes/usageTrackingController';
import uiRoutes from './routes/uiController';
import collaborationRoutes from './routes/collaborationController';
import versionControlRoutes from './routes/versionControlController';
import linkGeneratorRoutes from './routes/linkGeneratorController';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/audit-logs', auditLogsRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/import-export', importExportRoutes);
app.use('/api/bulk-operations', bulkOperationsRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/access-control', accessControlRoutes);
app.use('/api/usage-tracking', usageTrackingRoutes);
app.use('/api/ui', uiRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/version-control', versionControlRoutes);
app.use('/api/link-generator', linkGeneratorRoutes);

app.listen(port, () => {
  console.log(`Intooljar server is running on port ${port}`);
});

export default app;
