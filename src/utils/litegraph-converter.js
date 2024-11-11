// class used to convert the standard serialization of litegraph, to mobject-graph version for use
// in the backend.
// this will only contain information that is needed by the backend, whereas the serialize will
// provide all information

export class LiteGraphConverter {
  static Convert(graph) {
    const liteGraphData = JSON.parse(JSON.stringify(graph.serialize()));
    const nodesWithConvertedIds = this.#convertNodeIdsToStrings(
      liteGraphData.nodes
    );

    const transformedLinks = this.#transformLinks(
      nodesWithConvertedIds,
      liteGraphData.links
    );

    return this.#removeUnwantedProperties({
      ...liteGraphData,
      nodes: nodesWithConvertedIds,
      links: transformedLinks,
    });
  }

  static #convertNodeIdsToStrings(nodes) {
    return nodes.map((node) => ({
      ...node,
      id: String(node.id),
    }));
  }

  static #transformLinks(nodes, links) {
    return links.map((link) => {
      const [
        linkId,
        sourceNodeId,
        sourceOutputIndex,
        targetNodeId,
        targetInputIndex,
        type,
      ] = link;

      const linkIdStr = String(linkId);
      const sourceNodeIdStr = String(sourceNodeId);
      const targetNodeIdStr = String(targetNodeId);

      const sourceNode = nodes.find((node) => node.id === sourceNodeIdStr);
      const targetNode = nodes.find((node) => node.id === targetNodeIdStr);

      const sourceOutputName = sourceNode
        ? sourceNode.outputs[sourceOutputIndex]?.name || "unknown"
        : "unknown";
      const targetInputName = targetNode
        ? targetNode.inputs[targetInputIndex]?.name || "unknown"
        : "unknown";

      return [
        linkIdStr,
        sourceNodeIdStr,
        sourceOutputName,
        targetNodeIdStr,
        targetInputName,
        type,
      ];
    });
  }

  static #removeUnwantedProperties(graphData) {
    const {
      extra,
      version,
      config,
      last_node_id,
      last_link_id,
      ...cleanGraph
    } = graphData;

    cleanGraph.nodes = cleanGraph.nodes.map((node) => {
      const {
        flags,
        shape,
        size,
        pos,
        properties,
        inputs,
        outputs,
        ...cleanNode
      } = node;

      if (properties && Object.keys(properties).length) {
        cleanNode.properties = properties;
      }
      if (inputs && inputs.length) {
        cleanNode.inputs = inputs;
      }
      if (outputs && outputs.length) {
        cleanNode.outputs = outputs;
      }

      return cleanNode;
    });

    return cleanGraph;
  }
}
