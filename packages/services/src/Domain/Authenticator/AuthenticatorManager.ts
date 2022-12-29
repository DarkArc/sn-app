/* istanbul ignore file */

import { AuthenticatorApiServiceInterface } from '@standardnotes/api'

import { InternalEventBusInterface } from '../Internal/InternalEventBusInterface'
import { AbstractService } from '../Service/AbstractService'
import { AuthenticatorClientInterface } from './AuthenticatorClientInterface'

export class AuthenticatorManager extends AbstractService implements AuthenticatorClientInterface {
  constructor(
    private authenticatorApiService: AuthenticatorApiServiceInterface,
    protected override internalEventBus: InternalEventBusInterface,
  ) {
    super(internalEventBus)
  }

  async list(): Promise<{ id: string; name: string }[]> {
    try {
      const result = await this.authenticatorApiService.list()

      if (result.data.error) {
        return []
      }

      return result.data.authenticators
    } catch (error) {
      return []
    }
  }

  async delete(authenticatorId: string): Promise<boolean> {
    try {
      const result = await this.authenticatorApiService.delete(authenticatorId)

      if (result.data.error) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }

  async generateRegistrationOptions(userUuid: string, username: string): Promise<Record<string, unknown> | null> {
    try {
      const result = await this.authenticatorApiService.generateRegistrationOptions(userUuid, username)

      if (result.data.error) {
        return null
      }

      return result.data.options
    } catch (error) {
      return null
    }
  }

  async verifyRegistrationResponse(
    userUuid: string,
    name: string,
    registrationCredential: Record<string, unknown>,
  ): Promise<boolean> {
    try {
      const result = await this.authenticatorApiService.verifyRegistrationResponse(
        userUuid,
        name,
        registrationCredential,
      )

      if (result.data.error) {
        return false
      }

      return result.data.success
    } catch (error) {
      return false
    }
  }

  async generateAuthenticationOptions(): Promise<Record<string, unknown> | null> {
    try {
      const result = await this.authenticatorApiService.generateAuthenticationOptions()

      if (result.data.error) {
        return null
      }

      return result.data.options
    } catch (error) {
      return null
    }
  }

  async verifyAuthenticationResponse(
    userUuid: string,
    authenticationCredential: Record<string, unknown>,
  ): Promise<boolean> {
    try {
      const result = await this.authenticatorApiService.verifyAuthenticationResponse(userUuid, authenticationCredential)

      if (result.data.error) {
        return false
      }

      return result.data.success
    } catch (error) {
      return false
    }
  }
}