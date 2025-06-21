import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, DataTable, Avatar } from 'react-native-paper';

interface UsageStatsProps {
  sent: number;
  received: number;
  tokensTransferred: number;
}

const LeftIcon = (props: any) => <Avatar.Icon {...props} icon="chart-bar" />;

const UsageStats: React.FC<UsageStatsProps> = ({ sent, received, tokensTransferred }) => {
  const dataLimit = 1000000; // 1MB for demo
  const dataUsed = sent + received;
  const progress = Math.min(dataUsed / dataLimit, 1);

  return (
    <Card style={styles.card}>
      <Card.Title title="Usage Stats" left={LeftIcon} />
      <Card.Content>
        <Title>Data Used</Title>
        <Paragraph>{(dataUsed / 1000).toFixed(2)} KB / {(dataLimit / 1000).toFixed(0)} KB</Paragraph>
        <ProgressBar progress={progress} style={styles.progress} />
        <Title style={styles.sectionTitle}>Session Details</Title>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Sent</DataTable.Cell>
            <DataTable.Cell numeric>{(sent / 1000).toFixed(2)} KB</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Received</DataTable.Cell>
            <DataTable.Cell numeric>{(received / 1000).toFixed(2)} KB</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Tokens</DataTable.Cell>
            <DataTable.Cell numeric>{tokensTransferred}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 16, width: '100%' },
  progress: { marginVertical: 8 },
  sectionTitle: { marginTop: 16 },
});

export default UsageStats;
