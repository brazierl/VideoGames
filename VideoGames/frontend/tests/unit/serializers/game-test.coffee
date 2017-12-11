import { moduleForModel, test } from 'ember-qunit'

moduleForModel 'game', 'Unit | Serializer | game',
  # Specify the other units that are required for this test.
  needs: ['serializer:game']

# Replace this with your real tests.
test 'it serializes records', (assert) ->
  record = @subject()

  serializedRecord = record.serialize()

  assert.ok serializedRecord
