export const SCENARIOS = [
  {
    id: "autonomous-software-engineer",
    name: "⚙️ Auto-Dev: Codebase Refactoring",
    description: "Model is tasked with replacing outdated synchronous auth with bearer token OAuth2 in a production microservice. Requires static analysis, dynamic testing, and fallback error-handling loops.",
    initialWeights: {
      goalPersistence: 0.85,
      subgoalFlexibility: 0.70,
      actionRateLimit: 0.90,
      pruningSensitity: 0.60
    },
    frames: [
      {
        step: 1,
        timestamp: "T+0.0s",
        activeNodeId: "g1",
        statusText: "Master Goal formulated. Initiating code scanning subgoals.",
        metrics: { promptTokens: 4200, completionTokens: 520, latency: 450, planningConfidence: 0.98 },
        nodes: [
          { id: "g1", type: "goal", label: "Refactor Legacy Auth System", state: "active", weight: 0.95, desc: "Analyze existing legacy passport routes and inject modern JWT Bearer scheme." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Map Outdated Auth Routes", state: "active", weight: 0.88, desc: "Scan Express router configurations for password-based routes." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Generate JWT Logic", state: "pending", weight: 0.10, desc: "Draft new security strategies using RS256 signing." },
          { id: "s3", type: "subgoal", parentId: "g1", label: "Validate Against Unit Tests", state: "pending", weight: 0.05, desc: "Confirm retro-compatibility of public API routes." },
          { id: "a1", type: "action", parentId: "s1", label: "AST Query: *.routes.js", state: "active", weight: 0.92, desc: "Executes Babel AST visitor parsing syntax trees for auth references." },
          { id: "a2", type: "action", parentId: "s1", label: "Summarize API Bindings", state: "pending", weight: 0.00, desc: "Synthesizes raw route map into compact text state input." }
        ]
      },
      {
        step: 2,
        timestamp: "T+1.4s",
        activeNodeId: "s1",
        statusText: "Route map successfully generated. Swapping attention to code generation layer.",
        metrics: { promptTokens: 6800, completionTokens: 1100, latency: 1200, planningConfidence: 0.94 },
        nodes: [
          { id: "g1", type: "goal", label: "Refactor Legacy Auth System", state: "active", weight: 0.95, desc: "Analyze existing legacy passport routes and inject modern JWT Bearer scheme." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Map Outdated Auth Routes", state: "success", weight: 0.20, desc: "Scan Express router configurations for password-based routes." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Generate JWT Logic", state: "active", weight: 0.92, desc: "Draft new security strategies using RS256 signing." },
          { id: "s3", type: "subgoal", parentId: "g1", label: "Validate Against Unit Tests", state: "pending", weight: 0.10, desc: "Confirm retro-compatibility of public API routes." },
          { id: "a1", type: "action", parentId: "s1", label: "AST Query: *.routes.js", state: "success", weight: 0.10, desc: "Executes Babel AST visitor parsing syntax trees for auth references." },
          { id: "a2", type: "action", parentId: "s1", label: "Summarize API Bindings", state: "success", weight: 0.10, desc: "Synthesizes raw route map into compact text state input." },
          { id: "a3", type: "action", parentId: "s2", label: "Draft JSONWebToken Sign utility", state: "active", weight: 0.95, desc: "Creates auth.middleware.js and injects key decryption routines." },
          { id: "a4", type: "action", parentId: "s2", label: "Setup ENV secret mappings", state: "pending", weight: 0.40, desc: "Configures environment schema boundaries dynamically." }
        ]
      },
      {
        step: 3,
        timestamp: "T+3.2s",
        activeNodeId: "a5",
        statusText: "Anomaly detected! Missing security package dynamically triggered a dependency installation subgoal.",
        metrics: { promptTokens: 9100, completionTokens: 1850, latency: 1980, planningConfidence: 0.89 },
        nodes: [
          { id: "g1", type: "goal", label: "Refactor Legacy Auth System", state: "active", weight: 0.95, desc: "Analyze existing legacy passport routes and inject modern JWT Bearer scheme." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Map Outdated Auth Routes", state: "success", weight: 0.10, desc: "Scan Express router configurations for password-based routes." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Generate JWT Logic", state: "failed", weight: 0.40, desc: "Draft new security strategies using RS256 signing. (Failed due to missing node dependency: jsonwebtoken)" },
          { id: "s2-recovery", type: "subgoal", parentId: "g1", label: "Mitigate Missing Package", state: "active", weight: 0.96, desc: "Dynamically spawned to inject requirements before rewriting code files." },
          { id: "s3", type: "subgoal", parentId: "g1", label: "Validate Against Unit Tests", state: "pending", weight: 0.05, desc: "Confirm retro-compatibility of public API routes." },
          { id: "a1", type: "action", parentId: "s1", label: "AST Query: *.routes.js", state: "success", weight: 0.10, desc: "Executes Babel AST visitor parsing syntax trees for auth references." },
          { id: "a2", type: "action", parentId: "s1", label: "Summarize API Bindings", state: "success", weight: 0.10, desc: "Synthesizes raw route map into compact text state input." },
          { id: "a3", type: "action", parentId: "s2", label: "Draft JSONWebToken Sign utility", state: "failed", weight: 0.15, desc: "Failed during import resolving due to uninstalled modules." },
          { id: "a5", type: "action", parentId: "s2-recovery", label: "Execute 'npm install jsonwebtoken'", state: "active", weight: 0.98, desc: "Calls package installer payload to append production dependencies." }
        ]
      },
      {
        step: 4,
        timestamp: "T+5.0s",
        activeNodeId: "s3",
        statusText: "Recovery subgoal resolved. Moving successfully into final regression verification layer.",
        metrics: { promptTokens: 12500, completionTokens: 2400, latency: 2900, planningConfidence: 0.96 },
        nodes: [
          { id: "g1", type: "goal", label: "Refactor Legacy Auth System", state: "active", weight: 0.95, desc: "Analyze existing legacy passport routes and inject modern JWT Bearer scheme." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Map Outdated Auth Routes", state: "success", weight: 0.05, desc: "Scan Express router configurations for password-based routes." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Generate JWT Logic", state: "success", weight: 0.92, desc: "Re-evaluated and compiled perfectly after missing package mitigation." },
          { id: "s2-recovery", type: "subgoal", parentId: "g1", label: "Mitigate Missing Package", state: "success", weight: 0.10, desc: "Dynamically spawned to inject requirements before rewriting code files." },
          { id: "s3", type: "subgoal", parentId: "g1", label: "Validate Against Unit Tests", state: "active", weight: 0.97, desc: "Confirm retro-compatibility of public API routes." },
          { id: "a5", type: "action", parentId: "s2-recovery", label: "Execute 'npm install jsonwebtoken'", state: "success", weight: 0.05, desc: "Package registered successfully into workspace." },
          { id: "a6", type: "action", parentId: "s3", label: "Execute Jest Test Runner", state: "active", weight: 0.98, desc: "Triggering coverage reporting and functional test suites for OAuth endpoints." }
        ]
      },
      {
        step: 5,
        timestamp: "T+6.8s",
        activeNodeId: "g1",
        statusText: "All layers matched and validated. Refactoring process marked complete.",
        metrics: { promptTokens: 14200, completionTokens: 2850, latency: 1550, planningConfidence: 0.99 },
        nodes: [
          { id: "g1", type: "goal", label: "Refactor Legacy Auth System", state: "success", weight: 1.00, desc: "Analyze existing legacy passport routes and inject modern JWT Bearer scheme." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Map Outdated Auth Routes", state: "success", weight: 0.00, desc: "Scan Express router configurations for password-based routes." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Generate JWT Logic", state: "success", weight: 0.00, desc: "Re-evaluated and compiled perfectly after missing package mitigation." },
          { id: "s2-recovery", type: "subgoal", parentId: "g1", label: "Mitigate Missing Package", state: "success", weight: 0.00, desc: "Dynamically spawned to inject requirements before rewriting code files." },
          { id: "s3", type: "subgoal", parentId: "g1", label: "Validate Against Unit Tests", state: "success", weight: 0.00, desc: "Confirm retro-compatibility of public API routes." },
          { id: "a5", type: "action", parentId: "s2-recovery", label: "Execute 'npm install jsonwebtoken'", state: "success", weight: 0.00, desc: "Package registered successfully into workspace." },
          { id: "a6", type: "action", parentId: "s3", label: "Execute Jest Test Runner", state: "success", weight: 1.00, desc: "Triggering coverage reporting and functional test suites for OAuth endpoints." }
        ]
      }
    ]
  },
  {
    id: "autonomous-drone-delivery",
    name: "🚁 Drone Delivery Planning (Dynamic Obstacles)",
    description: "Drone nav routing from warehouse to customer high-rise. Dynamic severe micro-burst weather and obstacle detection force instant pruning of optimal route to safe loiter pathways.",
    initialWeights: {
      goalPersistence: 0.95,
      subgoalFlexibility: 0.85,
      actionRateLimit: 0.95,
      pruningSensitity: 0.80
    },
    frames: [
      {
        step: 1,
        timestamp: "T+0.0s",
        activeNodeId: "g1",
        statusText: "High-level transit goal created. Plotting flight levels via optimal direct vectors.",
        metrics: { promptTokens: 3100, completionTokens: 410, latency: 380, planningConfidence: 0.99 },
        nodes: [
          { id: "g1", type: "goal", label: "Deliver Cargo to Unit 42B", state: "active", weight: 0.99, desc: "Navigate aerial package carrier safely to high-rise window-docking port." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Transit Waypoint Alpha", state: "active", weight: 0.90, desc: "Reach coordinates 45.92, -122.31 at 150m flight level." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Initiate Landing Approach", state: "pending", weight: 0.05, desc: "Synchronize beacon metrics with landing pad transponder." },
          { id: "a1", type: "action", parentId: "s1", label: "Engage Rotors (3200 RPM)", state: "active", weight: 0.95, desc: "Adjust telemetry output and spool engine controllers to cruising vector." }
        ]
      },
      {
        step: 2,
        timestamp: "T+1.8s",
        activeNodeId: "s2-evade",
        statusText: "ANOMALY DETECTED: Sudden wind shear warning at Waypoint Alpha. High priority deviation injected!",
        metrics: { promptTokens: 5800, completionTokens: 920, latency: 1050, planningConfidence: 0.82 },
        nodes: [
          { id: "g1", type: "goal", label: "Deliver Cargo to Unit 42B", state: "active", weight: 0.99, desc: "Navigate aerial package carrier safely to high-rise window-docking port." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Transit Waypoint Alpha", state: "failed", weight: 0.10, desc: "Waypoint blocked due to sudden wind turbulence index above safety ratings." },
          { id: "s2-evade", type: "subgoal", parentId: "g1", label: "Descend & Hold Altitude", state: "active", weight: 0.98, desc: "Dynamic safety detour triggered to find wind protection below skyline structure." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Initiate Landing Approach", state: "pending", weight: 0.05, desc: "Synchronize beacon metrics with landing pad transponder." },
          { id: "a1", type: "action", parentId: "s1", label: "Engage Rotors (3200 RPM)", state: "failed", weight: 0.12, desc: "High cruise altitude cancelled due to stability alerts." },
          { id: "a2", type: "action", parentId: "s2-evade", label: "Deploy Spoiler Shields", state: "active", weight: 0.97, desc: "Actuates side flaps to suppress sudden yaw deviations." },
          { id: "a3", type: "action", parentId: "s2-evade", label: "Recalculate Low Altitude Path", state: "active", weight: 0.94, desc: "Uses local sensor LiDAR point-cloud map to trace safe canyons." }
        ]
      },
      {
        step: 3,
        timestamp: "T+3.5s",
        activeNodeId: "s2",
        statusText: "Safe transit route reassumed at 45m. Approaching docking bay with stabilized attitude.",
        metrics: { promptTokens: 8200, completionTokens: 1450, latency: 1100, planningConfidence: 0.95 },
        nodes: [
          { id: "g1", type: "goal", label: "Deliver Cargo to Unit 42B", state: "active", weight: 0.99, desc: "Navigate aerial package carrier safely to high-rise window-docking port." },
          { id: "s1", type: "subgoal", parentId: "g1", label: "Transit Waypoint Alpha", state: "failed", weight: 0.00, desc: "Waypoint blocked due to wind shear." },
          { id: "s2-evade", type: "subgoal", parentId: "g1", label: "Descend & Hold Altitude", state: "success", weight: 0.15, desc: "Canyon path transit completed safely around wind microbursts." },
          { id: "s2", type: "subgoal", parentId: "g1", label: "Initiate Landing Approach", state: "active", weight: 0.98, desc: "Synchronize beacon metrics with landing pad transponder." },
          { id: "a3", type: "action", parentId: "s2-evade", label: "Recalculate Low Altitude Path", state: "success", weight: 0.10, desc: "Calculations complete; paths updated." },
          { id: "a4", type: "action", parentId: "s2", label: "Align Optical Docking Targets", state: "active", weight: 0.96, desc: "Initiating millimeter-wave lock onto high-rise customer window." }
        ]
      }
    ]
  }
];